const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { eventsTypes } = require("@cheq.ai/cheq-middlewares");
const { createRtiMiddleware, createSlpMiddleware } = require('../config/config-factory');

// Vars
const apiKey = process.env.API_KEY_STAGING;
const tagHash = process.env.TAG_HASH_STAGING;
const adserverEndpoint = "https://obs.staging.cheqzone.com"

// Routes
router.get("/env-staging", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("index-staging", { rtiResString });
});
router.get("/env-staging-consentmode", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("index-staging-consentmode", { rtiResString });
});
router.get("/env-staging-bridge-connector", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("staging/index-bridge-connector", { rtiResString });
});

router.get("/env-staging-power-connector", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.render("staging/index-power-connector");
});

router.get("/env-staging-v4", function (req, res) {
    res.render("v4/index-staging");
});

// ** Defend Routes ** //
  // API V1 //
// All client-server sync methods
router.get("/subscribe-none-v1-staging", createRtiMiddleware("none","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// banRti 
router.get("/subscribe-banrti-v1-staging", createRtiMiddleware("banRti","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// rtiCookie
router.get("/subscribe-rticookie-v1-staging", createRtiMiddleware("rtiCookie","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
res.json(res.locals.rtiRes);
});
// requestId
router.get("/subscribe-requestid-v1-staging", createRtiMiddleware("requestId","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
res.json(res.locals.rtiRes);
});

// API V3 //
// All client-server sync methods
router.get("/subscribe-none-v3-staging", createRtiMiddleware("none","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// banRti 
router.get("/subscribe-banrti-v3-staging", createRtiMiddleware("banRti","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// rtiCookie
router.get("/subscribe-rticookie-v3-staging", createRtiMiddleware("rtiCookie","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// requestId
router.get("/subscribe-requestid-v3-staging", createRtiMiddleware("requestId","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});

// API V4 //

// IP & User Agent
router.post(
  "/subscribe-ip_useragent-v4-staging",
  createRtiMiddleware("ip_useragent", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  function (req, res) {
    res.json(res.locals.rtiRes);
  }
);

// Cookies only
router.post(
  "/subscribe-cookies-v4-staging",
  createRtiMiddleware("cookies", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  function (req, res) {
    res.json(res.locals.rtiRes);
  }
);

// Page View ID only
router.post(
  "/subscribe-pageviewid-v4-staging",
  createRtiMiddleware("pageviewid", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  function (req, res) {
    res.json(res.locals.rtiRes);
  }
);

// DUID only
router.post(
  "/subscribe-duid-v4-staging",
  createRtiMiddleware("duid", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    res.json(res.locals.rtiRes);
  }
);

// All identifiers (Cookies + Page View ID + DUID + IP + User Agent)
router.post(
  "/subscribe-all_identifiers-v4-staging",
  createRtiMiddleware("all_identifiers", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    res.json(res.locals.rtiRes);
  }
);

// ** Form-Guard Routes ** //
// v1 
router.post('/formsubmit-none-v1', createSlpMiddleware("comprehensive","none","v1",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

router.post('/formsubmit-banrti-v1', createSlpMiddleware("comprehensive","banRti","v1",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

router.post('/formsubmit-rticookie-v1', createSlpMiddleware("comprehensive","rtiCookie","v1",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-requestid-v1', createSlpMiddleware("comprehensive","requestId","v1",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

// v3 
router.post('/formsubmit-none-v3', createSlpMiddleware("comprehensive","none","v3",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-banrti-v3', createSlpMiddleware("comprehensive","banRti","v3",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-rticookie-v3', createSlpMiddleware("comprehensive","rtiCookie","v3",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-requestid-v3', createSlpMiddleware("comprehensive","requestId","v3",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

// v4 udv
router.post('/formsubmit-none-v4-staging', createSlpMiddleware("comprehensive","none","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-rticookie-v4-staging', createSlpMiddleware("comprehensive","rtiCookie","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-requestid-v4-staging', createSlpMiddleware("comprehensive","requestId","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

module.exports = router;