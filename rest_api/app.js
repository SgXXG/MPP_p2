const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let NOTES = [
    {id: v4(), title: 'Note', desc: 'first note', marked: false, dismarked: true, search: false}
]

app.use(express.json())

//GET
app.get('/api/notes', (req, res) => {
    res.status(200).json(NOTES)
})

//POST
app.post('/api/notes', (req, res) => {
    const note = {...req.body, id: v4(), marked: false}
    NOTES.push(note)
    res.status(201).json(note)
})

//DELETE
app.delete('/api/notes/:id', (req, res) => {
    NOTES = NOTES.filter(n => n.id !== req.params.id)
    res.status(200).json({message: 'Note was successfully deleted'})
})

//PUT
app.put('/api/notes/:id', (req, res) => {
    const idx = NOTES.findIndex(n => n.id === req.params.id)
    NOTES[idx] = req.body
    res.status(200).json(NOTES[idx])
})

//PUT
app.put('/api/notes/:id', (req, res) => {
    const idx = NOTES.findIndex(n => n.id === req.params.id)
    NOTES[idx] = req.body
    res.status(200).json(NOTES[idx])
})


app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('server has been started on port 3000...'))