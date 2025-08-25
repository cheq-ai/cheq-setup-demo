const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { eventsTypes } = require("@cheq.ai/cheq-middlewares");
const { createRtiMiddleware, createSlpMiddleware } = require('../config/config-factory');

// Vars
const apiKey = process.env.API_KEY_DEV;
const tagHash = process.env.TAG_HASH_DEV;
const adserverEndpoint = "https://obs.dev.cheqzone.com"

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Pages Routes
router.get("/env-dev", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);
});

router.get("/env-dev-consentmode", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("index-dev-consentmode", { rtiResString });
});

router.get("/env-dev-bridge-connector", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("dev/index-bridge-connector", { rtiResString });
});

router.get("/env-dev-power-connector", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.render("dev/index-power-connector");
});

router.get("/env-dev-v4", function (req, res) {
    res.render("v4/index-dev");
});

// ** Defend Routes ** //
// RTI V1 //
// All client-server sync methods
router.get("/subscribe-none-v1-dev", createRtiMiddleware("none","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// banRti 
router.get("/subscribe-banrti-v1-dev", createRtiMiddleware("banRti","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// rtiCookie
router.get("/subscribe-rticookie-v1-dev", createRtiMiddleware("rtiCookie","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
res.json(res.locals.rtiRes);
});
// requestId
router.get("/subscribe-requestid-v1-dev", createRtiMiddleware("requestId","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
res.json(res.locals.rtiRes);
});

// RTI V3 //
// All client-server sync methods
router.get("/subscribe-none-v3-dev", createRtiMiddleware("none","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// banRti 
router.get("/subscribe-banrti-v3-dev", createRtiMiddleware("banRti","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// rtiCookie
router.get("/subscribe-rticookie-v3-dev", createRtiMiddleware("rtiCookie","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// requestId
router.get("/subscribe-requestid-v3-dev", createRtiMiddleware("requestId","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});

// RTI V4 //
// IP & User Agent
router.post(
  "/subscribe-ip_useragent-v4-dev",
  createRtiMiddleware("ip_useragent", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  function (req, res) {
    res.json({
      rtiReq: res.locals.rtiReq,
      rtiRes: res.locals.rtiRes
    });
  }
);

// Cookies only
router.post(
  "/subscribe-cookies-v4-dev",
  createRtiMiddleware("cookies", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  function (req, res) {
    res.json({
      rtiReq: res.locals.rtiReq,
      rtiRes: res.locals.rtiRes
    });
  }
);

// Page View ID only
router.post(
  "/subscribe-pageviewid-v4-dev",
  createRtiMiddleware("pageviewid", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  function (req, res) {
    res.json({
      rtiReq: res.locals.rtiReq,
      rtiRes: res.locals.rtiRes
    });
  }
);

// DUID only
router.post(
  "/subscribe-duid-v4-dev",
  createRtiMiddleware("duid", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    res.json({
      rtiReq: res.locals.rtiReq,
      rtiRes: res.locals.rtiRes
    });
  }
);

// All identifiers (Cookies + Page View ID + DUID + IP + User Agent)
router.post(
  "/subscribe-all_identifiers-v4-dev",
  createRtiMiddleware("all_identifiers", "v4", eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    res.json({
      rtiReq: res.locals.rtiReq,
      rtiRes: res.locals.rtiRes
    });
  }
);

// ** Form-Guard Routes ** //
// v1 Regular Flow
router.post('/formsubmit-none-v1', createSlpMiddleware("fast","none","v1",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

router.post('/formsubmit-banrti-v1', createSlpMiddleware("fast","banRti","v1",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

router.post('/formsubmit-rticookie-v1', createSlpMiddleware("fast","rtiCookie","v1",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-requestid-v1', createSlpMiddleware("fast","requestId","v1",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

// v3 Regular Flow
router.post('/formsubmit-none-v3', createSlpMiddleware("fast","none","v3",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-banrti-v3', createSlpMiddleware("fast","banRti","v3",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-rticookie-v3', createSlpMiddleware("fast","rtiCookie","v3",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-requestid-v3', createSlpMiddleware("fast","requestId","v3",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

// v4 udv 

// All identifiers (Cookies + Page View ID + DUID + IP + User Agent)
router.post(
  "/formsubmit-all_identifiers-v4-dev",
  createSlpMiddleware("comprehensive", "all_identifiers", "v4", eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    res.json(res.locals.slpRes);
  }
);

// Cookies only
router.post(
  "/formsubmit-cookies-v4-dev",
  createSlpMiddleware("comprehensive", "cookies", "v4", eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    res.json(res.locals.slpRes);
  }
);

// Page View ID only
router.post(
  "/formsubmit-pageviewid-v4-dev",
  createSlpMiddleware("comprehensive", "pageviewid", "v4", eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    res.json(res.locals.slpRes);
  }
);

// DUID only
router.post(
  "/formsubmit-duid-v4-dev",
  createSlpMiddleware("comprehensive","duid", "v4", eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    res.json(res.locals.slpRes);
  }
);

// IP & User Agent
router.post(
  "/formsubmit-ip_useragent-v4-dev",
  createSlpMiddleware("comprehensive", "ip_useragent", "v4", eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint),
  (req, res) => {
    document.
    res.json(res.locals.slpRes);
  }
);

module.exports = router;