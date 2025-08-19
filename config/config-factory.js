const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { rti, slp } = require("@cheq.ai/cheq-middlewares");

function createRtiMiddleware(
  sessionSyncMode,
  apiVersion,
  eventType,
  blockingActive,
  apiKey,
  tagHash,
  apiEndpoint
) {
  return function (req, res, next) {
    const rtiOptions = {
      apiKey,
      tagHash,
      apiVersion,
      apiEndpoint,
      mode: blockingActive ? "blocking" : "monitoring",
      redirectUrl: `/redirect`,
      sessionSyncMode,
      data: req.body, 
      callback: (req, res, next) => {
        res.sendFile(path.join(__dirname, "../frontend/pages/captcha.html"));
      },
    };

    return rti(rtiOptions)(eventType)(req, res, next);
  };
}

function createSlpMiddleware(
  mode,
  sessionSyncMode,
  apiVersion,
  eventType,
  apiKey,
  tagHash,
  apiEndpoint
) {
  const slpOptions = {
    apiKey,
    tagHash,
    apiVersion,
    apiEndpoint,
    mode,
    timeout: null,
    sessionSyncMode,
  };

  return slp(slpOptions)(eventType);
}

module.exports = { createRtiMiddleware, createSlpMiddleware };
