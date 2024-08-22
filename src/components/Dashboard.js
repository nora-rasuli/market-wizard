import React, { useEffect, useState } from "react";
import { fetchTweets } from "../api";
import NavBar from "./NavBar";

const Dashboard = () => {
  const [tweets, setTweets] = useState([]);
  const [query, setQuery] = useState("stocks"); // Default query, can be updated based on user input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTweets = async () => {
      try {
        setLoading(true);
        const tweetData = await fetchTweets(query);
        setTweets(tweetData);
        setError(null); // Clear any previous errors
        console.log("Fetched tweets:", tweetData); // Debugging: log fetched tweets
      } catch (err) {
        console.error("Error fetching tweets:", err);
        setError("Failed to fetch tweets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getTweets();
  }, [query]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Market Sentiment for {query}
        </h2>

        <input
          type="text"
          placeholder="Search for a topic"
          value={query}
          onChange={handleQueryChange}
          className="mb-4 p-2 border rounded"
        />

        {loading && <p>Loading tweets...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <h3 className="text-xl font-semibold">Latest Tweets</h3>
          <ul>
            {tweets && tweets.length > 0
              ? tweets.map((tweet, index) => (
                  <li key={index} className="mb-4 p-2 border-b">
                    {tweet.text}
                  </li>
                ))
              : !loading && <p>No tweets found for "{query}".</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
