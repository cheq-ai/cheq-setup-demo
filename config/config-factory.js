const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { rti, slp } = require("@cheq.ai/cheq-middlewares");

function createRtiMiddleware(sessionSyncMode, apiVersion, eventType, blockingActive) {
  const rtiOptions = {
    apiKey: process.env.API_KEY,
    tagHash: process.env.TAG_HASH,
    apiVersion,
    apiEndpoint: "https://obs.dev.cheqzone.com",
    mode: blockingActive ? "blocking" : "monitoring",
    timeout: null,
    threatTypesCodes: {
      blockRedirect: [2, 3, 6, 11, 16, 18, 29, 10],
      captcha: [4, 5, 13, 15, 17, 7, 14],
    },
    redirectUrl: `/redirect`,
    callback: function (req, res, next) {
      res.sendFile(path.join(__dirname, "../frontend/pages/captcha.html"));
    },
    sessionSyncMode, // banRti OR rtiCookie OR requestId OR none
  };

  return rti(rtiOptions)(eventType);
}

function createSlpMiddleware(mode, sessionSyncMode, apiVersion, eventType) {
  const slpOptions = {
    apiKey: process.env.API_KEY,
    tagHash: process.env.TAG_HASH,
    apiVersion,
    apiEndpoint: "https://obs.dev.cheqzone.com",
    mode,
    timeout: null,
    sessionSyncMode, // banRti OR rtiCookie OR requestId OR none
  };

  return slp(slpOptions)(eventType);
}

module.exports = { createRtiMiddleware, createSlpMiddleware };
