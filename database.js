require('dotenv').config();
const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = process.env.DB_SOURCE || "movies.db";

// inisiasi database baru
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to SQLite database.");
        db.run(`CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title text NOT NULL, 
            director text NOT NULL, 
            year INTEGER NOT NULL )`, (err) => {
            if (err) {
                console.log("Gagal membuat database", err.message);
            }
            db.get(`SELECT COUNT(*) as count FROM movies`, (err, row) => {
                if (err) {
                    return console.error(err.message);
                }
                if (row.count === 0) {
                    console.log("Menambahkan data awal ke tabel  movies");
                    const insert = `INSERT INTO movies (title, director, year) VALUES (?, ?, ?)`;
                    db.run(insert, ["Parasite", "Bong Joon-ho", 2019]);
                    db.run(insert, ["The Dark Knight", "Christopen Nolan", 2008]);
                }
            });
        });
        db.run(`CREATE TABLE IF NOT EXISTS directors (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name text NOT NULL, 
            birthYear INTEGER NOT NULL )`, (err) => {
            if (err) {
                console.log("Gagal membuat database", err.message);
            }
            db.get(`SELECT COUNT(*) as count FROM directors`, (err, row) => {
                if (err) {
                    return console.error(err.message);
                }
                if (row.count === 0) {
                    console.log("Menambahkan data awal ke tabel directors");
                    const insert = `INSERT INTO directors (name, birthYear) VALUES (?, ?)`;
                    db.run(insert, ["Bong Joon-ho", 1969]);
                    db.run(insert, ["Christopen Nolan", 1970]);
                }
            });
        });

        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'user')", (err) => {
            if(err) {
                console.error('Error creating table', err.message);
            }
            console.log("Users table created");
        });
    }
});

module.exports = db;

