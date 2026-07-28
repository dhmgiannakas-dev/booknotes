import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const upload = multer({ storage: multer.memoryStorage() });

// sending data to front and loading frontpage

app.get("/", async (req, res) => {
  const desc = "Keep track of your reading with Personal BookNotes. Organize your notes, summaries, and highlights from every book you read.";
  const title = "BookNotes";
  const books = await db.query("SELECT * FROM books ORDER BY id");
  res.render("index", {
    description: desc,
    title: title,
    books: books.rows
  });
});

// selecting the image

app.get("/image/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.query(
      "SELECT image, image_type FROM books WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0 || !result.rows[0].image) {
      return res.status(404).send("No image found");
    }

    const img = result.rows[0].image;
    const imgType = result.rows[0].image_type || "image/jpeg";

    res.set("Content-Type", imgType);
    res.send(img);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// inserting the image to our database's table

app.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    const imageBuffer = req.file ? req.file.buffer : null;
    const imageType = req.file ? req.file.mimetype : null;

    await db.query(
      `INSERT INTO books (title, author, genre, description, image, image_type)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, author, genre, description, imageBuffer, imageType]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// delete any unnecessary book from our notes

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query("DELETE FROM books WHERE id = $1", [id]);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
