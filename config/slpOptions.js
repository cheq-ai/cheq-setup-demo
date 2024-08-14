const { slpConfig } = require("@cheq.ai/cheq-middlewares/config");
const dotenv = require("dotenv");
dotenv.config();

const slpOptions = {
  apiKey: process.env.API_KEY,
  tagHash: process.env.TAG_HASH,
  apiEndpoint: 'https://obs.dev.cheqzone.com',
  mode: "fast",
  timeout: null,
};

module.exports = slpOptions;
