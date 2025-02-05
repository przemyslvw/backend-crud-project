require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Tymczasowe przechowywanie danych w pamięci
let items = [];

// Endpoint do tworzenia nowego elementu
app.post("/items", (req, res) => {
    const { id, name, description } = req.body;
    if (!id || !name || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = { id, name, description };
    items.push(newItem);
    res.status(201).json({ message: "Item added", item: newItem });
});

// Endpoint do pobierania wszystkich elementów
app.get("/items", (req, res) => {
    res.json(items);
});

// Endpoint do usuwania elementu
app.delete("/items/:id", (req, res) => {
    const { id } = req.params;
    items = items.filter((item) => item.id !== id);
    res.json({ message: "Item deleted" });
});

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
