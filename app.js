const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const { auth } = require("express-openid-connect"); // Auth0
const { authConfig } = require("./config/auth0"); // Auth0

// Import Routes
const devRoutes = require("./routes/dev");
const stagingRoutes = require("./routes/staging");
const prodRoutes = require("./routes/prod");

// Setup & Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "pages"));
app.use(express.static(path.join(__dirname, "./frontend")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth(authConfig));
app.use((req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
});

// Routes
app.get("/", function (req, res) {
  res.render("index");
});
app.use("", devRoutes);
app.use("", stagingRoutes);
app.use("", prodRoutes);
app.get("/hubspot", function (req, res) {
  res.render("index-hubspot");
});
app.get("/marketo", function (req, res) {
  res.render("index-marketo");
});
app.get("/redirect", function (req, res) {
  res.json("BLOCKED AND REDIRECTED! 🤖👋🏼");
});
app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "robots.txt"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
