const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const path = require("path");
const { rti, eventsTypes } = require("@cheq.ai/cheq-middlewares");
const { apiEndpoints } = require("@cheq.ai/cheq-middlewares/config");
const PORT = process.env.PORT || 5000;
const baseUrl = `${process.env.BASE_URL}`;
const options = {
  apiKey: process.env.API_KEY,
  tagHash: process.env.TAG_HASH,
  apiEndpoint: apiEndpoints.DEV,
  mode: "blocking",
  threatTypesCodes: {
    blockRedirect: [2, 3, 6, 11, 16, 18, 29, 10], // threat_type 10 = Malicious Bots / threat_type 3 = Automation tool -> bot useragent string: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) -> block & redirect (redirectUrl)
    captcha: [4, 5, 13, 15, 17, 7, 14], // threat_type 14 = VPN -> navigate to captcha.html (callback)
  },
  redirectUrl: `${baseUrl}/redirect`,
  callback: function (req, res, next) {
    res.sendFile(path.join(__dirname, "/frontend/captcha.html"));
  },
};

// Setup
const middleware = rti(options);
app.use(express.static(path.join(__dirname, "./frontend")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend"));

// Routes
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/subscribe", middleware(eventsTypes.SUBSCRIBE), function (req, res) {
  console.log('req ip:', getClientIp(req));

  const rtiRes = res.locals.rtiRes;
  const rtiResString = JSON.stringify(rtiRes, null, 2);

  res.render("subscribe", { rtiResString });
});
app.get("/redirect", function (req, res) {
  res.render("redirect");
});

// Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




function getClientIp(req) {
  let ipAddress = req.ip;

  // Handle IPv6 loopback address
  if (ipAddress === '::1' || ipAddress === '::ffff:127.0.0.1') {
    ipAddress = '127.0.0.1';
  }

  // Check for IPv6 address and convert to IPv4 if necessary
  if (ipAddress.includes('::ffff:')) {
    ipAddress = ipAddress.split('::ffff:')[1];
  }

  // Handle x-forwarded-for header if behind a proxy
  const forwardedIpsStr = req.header('x-forwarded-for');
  if (forwardedIpsStr) {
    const forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0].trim();
  }

  return ipAddress;
}