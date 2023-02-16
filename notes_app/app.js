const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

let notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const { q } = req.query;
    let filteredNotes = notes;
    if (q) {
        filteredNotes = notes.filter(note => note.toLowerCase().includes(q.toLowerCase()));
    }
    res.render('index', { notes: filteredNotes, q });
});


app.post('/notes', (req, res) => {
    const { note } = req.body;
    notes.push(note);
    res.redirect('/');
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    notes.splice(id, 1);
    res.redirect('/');
});

app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const updatedNote = req.body.updatedNote;
    notes[id] = updatedNote;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Note app listening at http://localhost:${port}`);
});
