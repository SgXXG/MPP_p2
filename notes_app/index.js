const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let notes = [
    { id: 1, title: 'Note 1', content: 'This is the first note.' },
    { id: 2, title: 'Note 2', content: 'This is the second note.' },
    { id: 3, title: 'Note 3', content: 'This is the third note.' }
];
let nextId = 4;

app.get('/', (req, res) => {
    res.render('index', { notes });
});

app.post('/add', upload.single('file'), (req, res) => {
    const { title, content } = req.body;
    const newNote = { id: nextId, title, content, file: req.file };
    nextId++;
    notes.push(newNote);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.redirect('/');
});

app.get('/search', (req, res) => {
    const { query } = req.query;
    const searchResults = notes.filter(note => note.title.includes(query) || note.content.includes(query));
    res.render('search', { query, searchResults });
});

app.listen(3000, () => console.log('Server started on port 3000'));
