require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(cors());

app.get("/api/tweets", async (req, res) => {
  const { query } = req.query;
  console.log("Bearer Token:", process.env.TWITTER_BEARER_TOKEN); // Debugging: log the Bearer Token
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/search/recent`,
      {
        params: {
          query,
          max_results: 10,
        },
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    res.json(response.data.data);
  } catch (error) {
    console.error("Error fetching tweets from Twitter API:", error);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
