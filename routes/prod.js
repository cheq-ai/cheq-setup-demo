const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { eventsTypes } = require("@cheq.ai/cheq-middlewares");
const { createRtiMiddleware, createSlpMiddleware } = require('../config/config-factory');

// Vars
const apiKey = process.env.API_KEY_PROD;
const tagHash = process.env.TAG_HASH_PROD;
const adserverEndpoint = "https://obs.cheqzone.com"

// Routes
router.get("/env-prod", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("index-prod", { rtiResString });
});
router.get("/env-prod-consentmode", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("index-prod-consentmode", { rtiResString });
});
router.get("/env-prod-bridge-connector", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    const rtiRes = res.locals.rtiRes;
    const rtiResString = JSON.stringify(rtiRes, null, 2);

    res.render("prod/index-bridge-connector", { rtiResString });
});

router.get("/env-prod-power-connector", createRtiMiddleware("none", "v1", eventsTypes.PAGE_LOAD, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.render("prod/index-power-connector");
});

router.get("/env-prod-v4", function (req, res) {
    res.render("v4/index-prod");
});

// ** Defend Routes ** //
  // API V1 //
// All client-server sync methods
router.get("/subscribe-none-v1-prod", createRtiMiddleware("none","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// banRti 
router.get("/subscribe-banrti-v1-prod", createRtiMiddleware("banRti","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// rtiCookie
router.get("/subscribe-rticookie-v1-prod", createRtiMiddleware("rtiCookie","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
res.json(res.locals.rtiRes);
});
// requestId
router.get("/subscribe-requestid-v1-prod", createRtiMiddleware("requestId","v1",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
res.json(res.locals.rtiRes);
});

// API V3 //
// All client-server sync methods
router.get("/subscribe-none-v3-prod", createRtiMiddleware("none","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// banRti 
router.get("/subscribe-banrti-v3-prod", createRtiMiddleware("banRti","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// rtiCookie
router.get("/subscribe-rticookie-v3-prod", createRtiMiddleware("rtiCookie","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// requestId
router.get("/subscribe-requestid-v3-prod", createRtiMiddleware("requestId","v3",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});

// API V4 //
// All client-server sync methods (none)
router.get("/subscribe-none-v4-prod", createRtiMiddleware("none","v4",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// rtiCookie
router.get("/subscribe-rticookie-v4-prod", createRtiMiddleware("rtiCookie","v4",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// requestId
router.get("/subscribe-requestid-v4-prod", createRtiMiddleware("requestId","v4",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});
// duid
router.get("/subscribe-duid-v4-prod", createRtiMiddleware("duid","v4",eventsTypes.SUBSCRIBE, true, apiKey, tagHash, adserverEndpoint), function (req, res) {
    res.json(res.locals.rtiRes);
});

// ** Form-Guard Routes ** //
// v1
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

// v3 
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
router.post('/formsubmit-none-v4-prod', createSlpMiddleware("fast","none","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-rticookie-v4-prod', createSlpMiddleware("fast","rtiCookie","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});
router.post('/formsubmit-requestid-v4-prod', createSlpMiddleware("fast","requestId","v4",eventsTypes.SUBSCRIBE, apiKey, tagHash, adserverEndpoint), (req, res) => {
    const slpRes = res.locals.slpRes

    res.json(slpRes);
});

module.exports = router;