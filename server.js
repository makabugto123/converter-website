const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3036;

app.use(express.static("public"));

app.get("/convert", async (req, res) => {
    const { url } = req.query;
    const bitrate = 120; // Default bitrate

    if (!url) {
        return res.json({ error: "No URL provided." });
    }

    try {
        const apiUrl = `https://downloader.iyot.plus/ytdl?url=${encodeURIComponent(url)}&type=mp3&bitrate=${bitrate}`;
        const response = await axios.get(apiUrl);

        if (!response.data.download) {
            return res.json({ error: "Failed to get download link." });
        }

        res.json({
            title: response.data.title,
            download: response.data.download
        });

    } catch (error) {
        res.json({ error: "Conversion failed." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
