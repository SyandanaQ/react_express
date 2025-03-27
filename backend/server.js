const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Create (Menambah data)
app.post("/items", async (req, res) => {
    try {
        const { name, price } = req.body;
        const item = await prisma.item.create({
            data: { name, price }
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: "Gagal menambah data" });
    }
});

// Read (Menampilkan semua data)
app.get("/items", async (req, res) => {
    const items = await prisma.item.findMany();
    res.json(items);
});

// Update (Mengubah data)
app.put("/items/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const item = await prisma.item.update({
            where: { id: Number(id) },
            data: { name, price }
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengupdate data" });
    }
});

// Delete (Menghapus data)
app.delete("/items/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.item.delete({ where: { id: Number(id) } });
        res.json({ message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus data" });
    }
});

// Jalankan server
app.listen(5000, () => console.log("Server berjalan di port 5000"));
