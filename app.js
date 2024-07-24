const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "./frontend")));

// API endpoint
// app.get("/api", (req, res) => {
//   res.send("Hello from the backend!");
// });

// All other requests to frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


