# 📚 BookNotes

BookNotes is a full-stack web application that allows users to create and manage their personal book collection. Users can add books with details such as title, author, genre, description, and cover image, then view or remove them whenever they want.

## 🌐 Live Demo

👉 https://booknotes-i7lk.onrender.com

## ✨ Features

- Add new books
- Upload book cover images
- View all saved books
- Delete books
- PostgreSQL database integration
- Responsive and clean user interface

## 🛠️ Built With

- Node.js
- Express.js
- PostgreSQL
- EJS
- Multer
- HTML5
- CSS3
- JavaScript

## 📸 Screenshots

> You can add screenshots of the application here.

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/dhmgiannakas-dev/booknotes.git
```

Go to the project folder:

```bash
cd booknotes
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
DATABASE_URL=your_database_url
PORT=3000
NODE_ENV=development
```

Run the application:

```bash
npm start
```

Open your browser at:

```
http://localhost:3000
```

## 🗄️ Database

Run the SQL script included in the project:

```
schema.sql
```

to create the required `books` table.

## 📂 Project Structure

```
booknotes/
│
├── public/
│   ├── css/
│   └── js/
│
├── views/
│
├── schema.sql
├── index.js
├── package.json
├── .env.example
└── README.md
```

## 👨‍💻 Author

**Dimitris Giannakas**

GitHub: https://github.com/dhmgiannakas-dev

---

⭐ If you like this project, consider giving it a star on GitHub!
