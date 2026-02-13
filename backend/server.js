require('dotenv').config(); // Load the secrets from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. Middleware (The Doorman)
// Allows our React app (frontend) to talk to this backend
app.use(cors());
// Allows us to understand JSON data sent in requests
app.use(express.json());

// 2. Database Connection (The Bridge)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Successfully!'))
    .catch(err => console.error('❌ Connection Failed:', err));

// 3. The Schema (The Blueprint)
// This tells MongoDB what a "Note" looks like
const noteSchema = new mongoose.Schema({
    text: String,
    color: { type: String, default: '#ffeb3b' }, // Default yellow
    createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

// 4. Routes (The Menu)

// GET: Fetch all notes from the DB
app.get('/notes', async (req, res) => {
    try {
        const allNotes = await Note.find().sort({ createdAt: -1 }); // Newest first
        res.json(allNotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create a new note
app.post('/notes', async (req, res) => {
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

// DELETE: Remove a note by ID
app.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});