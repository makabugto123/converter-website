const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3036;

app.use(express.static("public"));

app.get("/convert", async (req, res) => {
    const { url, type } = req.query;

    if (!url || !type) {
        return res.json({ error: "No URL or type provided." });
    }

    // Construct the API URL based on the selected type
    const apiUrl = `https://downloader.iyot.plus/ytdl?url=${encodeURIComponent(url)}&type=${type}`;

    try {
        const response = await axios.get(apiUrl);

        if (!response.data.download) {
            return res.json({ error: "Failed to get download link." });
        }

        res.json({
            title: response.data.title,
            download: response.data.download,
            thumbnail: response.data.thumbnail,
            size: response.data.size,
        });

    } catch (error) {
        res.json({ error: "Conversion failed." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
