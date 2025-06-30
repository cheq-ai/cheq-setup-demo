const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { rti, slp } = require("@cheq.ai/cheq-middlewares");

function createRtiMiddleware(sessionSyncMode, apiVersion, eventType, blockingActive, apiKey, tagHash, apiEndpoint) {
  const rtiOptions = {
    apiKey,
    tagHash,
    apiVersion,
    apiEndpoint,
    mode: blockingActive ? "blocking" : "monitoring",
    timeout: null,
    threatTypesCodes: {
      blockRedirect: [],
      captcha: [],
    },
    redirectUrl: `/redirect`,
    callback: function (req, res, next) {
      res.sendFile(path.join(__dirname, "../frontend/pages/captcha.html"));
    },
    sessionSyncMode, // banRti OR rtiCookie OR requestId OR none
  };

  console.log(rtiOptions)

  return rti(rtiOptions)(eventType);
}

function createSlpMiddleware(mode, sessionSyncMode, apiVersion, eventType, apiKey, tagHash, apiEndpoint) {
  const slpOptions = {
    apiKey,
    tagHash,
    apiVersion,
    apiEndpoint,
    mode,
    timeout: null,
    sessionSyncMode, // banRti OR rtiCookie OR requestId OR none
  };

  return slp(slpOptions)(eventType);
}

module.exports = { createRtiMiddleware, createSlpMiddleware };
