const rtiOptions = require("./config/rtiOptions");
const slpOptions = require("./config/slpOptions");
const express = require("express");
const app = express();
const path = require("path");

const { rti, slp, eventsTypes } = require("@cheq.ai/cheq-middlewares");
const PORT = process.env.PORT || 5000;

// Setup
app.use(express.static(path.join(__dirname, './frontend')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "pages"));
const rtiMiddleware = rti(rtiOptions);
const slpMiddleware = slp(slpOptions);

// Routes
app.get("/",rtiMiddleware(eventsTypes.PAGE_LOAD), function (req, res) {
  res.render("index");
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get("/subscribe", rtiMiddleware(eventsTypes.SUBSCRIBE), function (req, res) {
  const rtiRes = res.locals.rtiRes;
  const rtiResString = JSON.stringify(rtiRes, null, 2);

  res.render("subscribe", { rtiResString });
});

app.get("/redirect", function (req, res) {
  res.render("redirect");
});

app.post('/form-submit', slpMiddleware(eventsTypes.FORM_SUBMISSION), (req, res) => {
  const slpRes = res.locals.slpRes

  res.json(slpRes);
});

// Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});