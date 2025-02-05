require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // Obsługa CORS
app.use(express.json()); // Middleware do parsowania JSON
app.use(express.urlencoded({ extended: true })); // Obsługa danych z formularzy

// Tymczasowe przechowywanie danych w pamięci
let items = [];

// Endpoint do tworzenia nowego elementu
app.post("/items", async (req, res) => {
    const { id, startTime, endTime, startMileage, endMileage, driverName, licensePlate } = req.body;

    // Walidacja danych
    if (!id || !startTime || !endTime || !startMileage || !endMileage || !driverName || !licensePlate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (endMileage < startMileage) {
        return res.status(400).json({ error: "End mileage must be greater than start mileage" });
    }

    const newItem = { id, startTime, endTime, startMileage, endMileage, driverName, licensePlate };
    items.push(newItem);
    res.status(201).json({ message: "Item added", item: newItem });
});

// edycja elementu
app.put("/items/:id", (req, res) => {
    const { id } = req.params;
    const { startTime, endTime, startMileage, endMileage, driverName, licensePlate } = req.body;

    // Walidacja danych
    if (!startTime || !endTime || !startMileage || !endMileage || !driverName || !licensePlate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Znajdź element w liście
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }

    // Aktualizuj dane elementu
    items[itemIndex] = { id, startTime, endTime, startMileage, endMileage, driverName, licensePlate };
    res.status(200).json({ message: "Item updated", item: items[itemIndex] });
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
