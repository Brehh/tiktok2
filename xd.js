const express = require('express');
const Tiktok = require("@tobyg74/tiktok-api-dl");

const app = express();
const port = 3000;

// Endpoint for downloading TikTok media
app.get('/download', async (req, res) => {
  const tiktok_url = req.query.url; // Get TikTok URL from the request query

  if (!tiktok_url) {
    return res.status(400).send({ error: 'TikTok URL is required' });
  }

  try {
    const result = await Tiktok.Downloader(tiktok_url, {
      version: "v2",
      proxy: "64.92.82.59"
    });

    if (result.status === 'success') {
      if (result.result.type === 'video') {
        res.redirect(result.result.video); // Send video URL as response
      } else if (result.result.type === 'image') {
        res.redirect(result.result.images[1]); // Send image URLs as response
      }
    } else {
      res.status(500).send({ error: 'Failed to download media' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
