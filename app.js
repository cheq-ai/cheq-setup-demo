const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const { eventsTypes } = require("@cheq.ai/cheq-middlewares");
const { createRtiMiddleware, createSlpMiddleware } = require('./logic/config-factory');

// Setup
app.use(express.static(path.join(__dirname, './frontend')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "pages"));

// Routes
app.get("/", createRtiMiddleware("none","v1",eventsTypes.PAGE_LOAD), function (req, res) {
  const rtiRes = res.locals.rtiRes;
  const rtiResString = JSON.stringify(rtiRes, null, 2);

  res.render("index", { rtiResString });
});

// ** Defend Routes ** //
  // All client-server sync methods
app.get("/subscribe-none", createRtiMiddleware("none","v1",eventsTypes.SUBSCRIBE), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // banRti 
app.get("/subscribe-banrti", createRtiMiddleware("banRti","v1",eventsTypes.SUBSCRIBE), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // rtiCookie
app.get("/subscribe-rticookie", createRtiMiddleware("rtiCookie","v1",eventsTypes.SUBSCRIBE), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // requestId
app.get("/subscribe-requestid", createRtiMiddleware("requestId","v1",eventsTypes.SUBSCRIBE), function (req, res) {
  res.json(res.locals.rtiRes);
});

// ** Form-Guard Routes ** //
  // v1 Regular Flow
app.post('/form-submit-none', createSlpMiddleware("fast","none","v1",eventsTypes.SUBSCRIBE), (req, res) => {
  const slpRes = res.locals.slpRes

  res.json(slpRes);
});
app.post('/form-submit-banrti', createSlpMiddleware("fast","banRti","v1",eventsTypes.SUBSCRIBE), (req, res) => {
  const slpRes = res.locals.slpRes

  res.json(slpRes);
});
app.post('/form-submit-rticookie', createSlpMiddleware("fast","rtiCookie","v1",eventsTypes.SUBSCRIBE), (req, res) => {
  const slpRes = res.locals.slpRes

  res.json(slpRes);
});
app.post('/form-submit-requestid', createSlpMiddleware("fast","requestId","v1",eventsTypes.SUBSCRIBE), (req, res) => {
  const slpRes = res.locals.slpRes

  res.json(slpRes);
});

// ** Other Routes ** //
app.get("/redirect", function (req, res) {
  res.render("redirect");
});
app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

