import axios from "axios";

export const fetchTweets = async (query) => {
  try {
    const response = await axios.get(`/api/tweets`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
};
