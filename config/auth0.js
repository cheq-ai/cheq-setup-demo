const dotenv = require("dotenv");
dotenv.config();

module.exports.authConfig = {
  authRequired: true,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: "https://internal-tools.eu.auth0.com",
};