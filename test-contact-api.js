const axios = require("axios");

// Test the contact API endpoint
async function testContactAPI() {
  try {
    console.log("Sending request to http://localhost:3001/api/contact");
    const response = await axios.post("http://localhost:3001/api/contact", {
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message from the API test script.",
    });
    console.log("Request sent successfully");

    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error occurred:");
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error message:", error.message);
    }
  }
}

testContactAPI();
