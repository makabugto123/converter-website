const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3036;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files (index.html)

// API route to convert YouTube videos
app.get("/convert", async (req, res) => {
    const { url, type } = req.query;

    if (!url || !type) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const response = await axios.get(`https://downloader.iyot.plus/ytdl?url=${url}&type=${type}`);
        res.json({ downloadLink: response.data.download });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch download link" });
    }
});

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

