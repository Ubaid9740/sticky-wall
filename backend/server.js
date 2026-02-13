require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();



app.use(cors());

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Successfully!'))
    .catch(err => console.error('❌ Connection Failed:', err));



const noteSchema = new mongoose.Schema({
    text: String,
    color: { type: String, default: '#ffeb3b' }, // Default yellow
    createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);




app.get('/notes', async (req, res) => {
    try {
        const allNotes = await Note.find().sort({ createdAt: -1 }); // Newest first
        res.json(allNotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


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


app.delete('/notes/:id', async (req, res) => {
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



module.exports = app;