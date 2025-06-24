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

// Routes
router.get("/env-dev", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("index-dev", { rtiResString });
});

router.get("/env-dev-consentmode", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("index-dev-consentmode", { rtiResString });
});

router.get("/env-dev-bridge-connector", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, false, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("index-dev-bridge-connector", { rtiResString });
});

router.get("/env-dev-v4", function (req, res) {
    res.render("v4/index-dev");
});

// ** Defend Routes ** //
  // API V1 //
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

// API V3 //
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

// API V4 //
// All client-server sync methods (none)
router.get("/subscribe-none-v4-dev", createRtiMiddleware("none","v4",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// rtiCookie
router.get("/subscribe-rticookie-v4-dev", createRtiMiddleware("rtiCookie","v4",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// requestId
router.get("/subscribe-requestid-v4-dev", createRtiMiddleware("requestId","v4",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});

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
router.post('/formsubmit-none-v4-dev', createSlpMiddleware("fast","none","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-rticookie-v4-dev', createSlpMiddleware("fast","rtiCookie","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-requestid-v4-dev', createSlpMiddleware("fast","requestId","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

module.exports = router;