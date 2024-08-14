const rtiOptions = require("./config/rtiOptions");
const slpOptions = require("./config/slpOptions");
const express = require("express");
const app = express();
const path = require("path");

const { rti, slp, eventsTypes } = require("@cheq.ai/cheq-middlewares");
const PORT = process.env.PORT || 5000;

// Setup
const rtiMiddleware = rti(rtiOptions);
// const slpMiddleware = slp(slpOptions);
app.use(express.static(path.join(__dirname, "./frontend")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend"));

// Routes
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/subscribe", rtiMiddleware(eventsTypes.SUBSCRIBE), function (req, res) {
  const rtiRes = res.locals.rtiRes;
  const rtiResString = JSON.stringify(rtiRes, null, 2);

  res.render("subscribe", { rtiResString });
});

app.get("/redirect", function (req, res) {
  res.render("redirect");
});

// Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});