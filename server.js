const express = require("express"); // memanggil express
const app = express(); // memasukkan express ke variabel app
const port = 3100; // mau di running di port berapa

// menggunakan json untuk menyimpan data di ram
app.use(express.json());

idSeq = 4;
idSeqDirector = 3;

let movies = [
    { id: 1, title: "Inception", director: "Chirstopen Nolan", year: 2010 },
    { id: 2, title: 'The Matrix', director: 'The Wachowskis', year: 1999 },
    { id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014 }
];

let directors = [
    { id: 1, name: "Cristopen Nolan", birthYear: 1980 },
    { id: 2, name: "The Wachowskis", birthYear: 1990 }
];

// membuat endpoint
app.get('/', (req, res) => {
    res.send("Selamat datang di API Film!");
});

// membuat endpoint untuk menampilkan semua movies
app.get('/movies', (req, res) => {
    // mengembalikan data dalam bentuk json
    res.json(movies);
});

// membuat endpoint untuk menampilkan salah satu data movies berdasarkan id
app.get('/movies/:id', (req, res) => {
    // Number akan mengkonversi tipe data menjadi ke number, kalau string-nya terdapat selain angka maka akan menjadi NaN
    const idMovie = Number(req.params.id);
    const movie = movies.find(movie => movie.id === idMovie);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send("Movie not found!");
    }
});


// membuat endpoint untuk menambahkan data ke movies
app.post('/movies', (req, res) => {
    const { title, director, year } = req.body || {};
    if(!title || !director || !year) {
        return res.status(400).send("Semua data wajib diisi!");
    }

    const newMovie = { id: idSeq++, title: title, director: director, year: year };
    movies.push(newMovie);
    res.status(201).json(movies);
});


app.put("/movies/:id", (req, res) => {
    const idMovies = Number(req.params.id);
    const moviesIndex = directors.findIndex(movie => movie.id === idMovies);
    if(idMovies === -1) {
        return res.status(400).send("Id director tidak ditemukan!");
    }
    const { title, director, year  } = req.body || {};
    if(!title || !director || !year) {
        return res.status(400).send("Semua data harus harus diisi!");
    }
    const updateMovie = {id: idMovies, title: title, director: director, year: year};
    movies[moviesIndex] = updateMovie;
    return res.status(200).json(updateMovie);
});

app.delete('/movies/:id', (req, res) => {
    const idMovie = Number(req.params.id);
    const movieIndex = directors.findIndex(movie => movie.id === idMovie);
    if(idMovie === -1) {
        return res.status(400).send("Id movie tidak ditemukan!");
    }
    movies.splice(movieIndex, 1);
    return res.status(204).send("Data sudah terhapus");
});


app.get('/directors', (req, res) => {
    return res.send(directors);
});

app.get('/directors/:id', (req, res) => {
    const idDirector = Number(req.params.id);
    const director = directors.find(director => director.id === idDirector);

    if(director) {
        return res.send(director);
    } else {
        return res.status(400).send("Data director tidak ditemukan!");
    }
});

app.post("/directors", (req, res) => {
    const { name, birthYear  } = req.body || {};
    if(!name || !birthYear) {
        return res.status(400).send("Nama dan tahun lahir harus diisi!");
    }
    const newDirector = { id: idSeqDirector++, name: name, birthYear: birthYear };
    directors.push(newDirector);
    res.status(201).json(directors);
});

app.put("/directors/:id", (req, res) => {
    const idDirector = Number(req.params.id);
    const directorIndex = directors.findIndex(director => director.id === idDirector);
    if(idDirector === -1) {
        return res.status(400).send("Id director tidak ditemukan!");
    }
    const { name, birthYear  } = req.body || {};
    if(!name || !birthYear) {
        return res.status(400).send("Nama dan tahun lahir harus diisi!");
    }
    const updateDirector = {id: idDirector, name: name, birthYear: birthYear};
    directors[directorIndex] = updateDirector;
    return res.status(200).json(updateDirector);
});

app.delete('/directors/:id', (req, res) => {
    const idDirector = Number(req.params.id);
    const directorIndex = directors.findIndex(director => director.id === idDirector);
    if(idDirector === -1) {
        return res.status(400).send("Id director tidak ditemukan!");
    }
    directors.splice(directorIndex, 1);
    return res.status(204).send("Data sudah terhapus");
});

// membuka port
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});