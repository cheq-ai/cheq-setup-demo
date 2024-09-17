const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const { eventsTypes } = require("@cheq.ai/cheq-middlewares");
const { createRtiMiddleware, createSlpMiddleware } = require('./config/config-factory');
const { auth } = require('express-openid-connect'); // Auth0
const { authConfig } = require('./config/auth0'); // Auth0

// Setup & Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend", "pages"));
app.use(express.static(path.join(__dirname, './frontend')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(auth(authConfig));
app.use((req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
});

// Routes
app.get("/", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false), function (req, res) {
  const rtiRes = res.locals.rtiRes;
  const rtiResString = JSON.stringify(rtiRes, null, 2);

  res.render("index", { rtiResString });
});

// ** Defend Routes ** //
  // API V1 //
   // All client-server sync methods
app.get("/subscribe-none-v1", createRtiMiddleware("none","v1",eventsTypes.SUBSCRIBE, true), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // banRti 
app.get("/subscribe-banrti-v1", createRtiMiddleware("banRti","v1",eventsTypes.SUBSCRIBE, true), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // rtiCookie
app.get("/subscribe-rticookie-v1", createRtiMiddleware("rtiCookie","v1",eventsTypes.SUBSCRIBE, true), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // requestId
app.get("/subscribe-requestid-v1", createRtiMiddleware("requestId","v1",eventsTypes.SUBSCRIBE, true), function (req, res) {
  res.json(res.locals.rtiRes);
});

  // API V3 //
   // All client-server sync methods
app.get("/subscribe-none-v3", createRtiMiddleware("none","v3",eventsTypes.SUBSCRIBE, true), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // banRti 
app.get("/subscribe-banrti-v3", createRtiMiddleware("banRti","v3",eventsTypes.SUBSCRIBE, true), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // rtiCookie
app.get("/subscribe-rticookie-v3", createRtiMiddleware("rtiCookie","v3",eventsTypes.SUBSCRIBE, true), function (req, res) {
  res.json(res.locals.rtiRes);
});
  // requestId
app.get("/subscribe-requestid-v3", createRtiMiddleware("requestId","v3",eventsTypes.SUBSCRIBE, true), function (req, res) {
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
  res.json("BLOCKED AND REDIRECTED! 🤖👋🏼");
});
app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

