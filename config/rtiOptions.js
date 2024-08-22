const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const rtiOptions = {
  apiKey: process.env.API_KEY,
  tagHash: process.env.TAG_HASH,
  apiEndpoint: 'https://obs.dev.cheqzone.com',
  mode: "blocking",
  timeout: null,
  threatTypesCodes: {
    blockRedirect: [2, 3, 6, 11, 16, 18, 29, 10],
    captcha: [4, 5, 13, 15, 17, 7, 14],
  },
  redirectUrl: `/redirect`,
  callback: function (req, res, next) {
    res.sendFile(path.join(__dirname, "../frontend/captcha.html"));
  },
  sessionSyncMode: "none",
};

module.exports = rtiOptions;
