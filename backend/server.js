require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();


app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Successfully!'))
    .catch(err => console.error('❌ Connection Failed:', err));

const noteSchema = new mongoose.Schema({
    text: String,
    color: { type: String, default: '#ffeb3b' },
    createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);




app.get('/api/notes', async (req, res) => {
    try {
        const allNotes = await Note.find().sort({ createdAt: -1 });
        res.json(allNotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/api/notes', async (req, res) => {
    try {
        const newNote = new Note({
            text: req.body.text,
            color: req.body.color
        });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.delete('/api/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});



app.get("/", (req, res) => res.send("Sticky Wall API is running..."));

module.exports = app;