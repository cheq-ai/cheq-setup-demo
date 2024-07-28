// adserver env: staging
// net id 8914
// search id 50193

// invoke: npm run start -> go to localhost:5000

const express = require("express");
const app = express();
const path = require("path");
const { rti, eventsTypes } = require("@cheq.ai/cheq-middlewares");
const { apiEndpoints } = require("@cheq.ai/cheq-middlewares/config");
const PORT = process.env.PORT || 5000;
const options = {
  apiKey: "ca9635f4-81fc-4dc4-9f2f-d4a78680787f",
  tagHash: "86236b7f11f14e894e0263ad7f7df9a0",
  apiEndpoint: apiEndpoints.DEV,
  mode: "blocking",
  threatTypesCodes: {
    blockRedirect: [2, 3, 6, 11, 16, 18, 29, 10], // threat_type 10 = Malicious Bots / threat_type 3 = Automation tool -> bot useragent string: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) -> block & redirect (redirectUrl)
    captcha: [4, 5, 13, 15, 17, 7, 14], // threat_type 14 = VPN -> navigate to captcha.html (callback)
  },
  redirectUrl: "https://localhost:5000/redirect.html",
  callback: function (req, res, next) {
    res.sendFile(path.join(__dirname, "./frontend", "captcha.html"));
  },
};

// Setup
const middleware = rti(options);
app.use(express.static(path.join(__dirname, "./frontend")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend"));

// Routes
app.get("/subscribe", middleware(eventsTypes.SUBSCRIBE), function (req, res) {
  const rtiRes = res.locals.rtiRes;
  const rtiResString = JSON.stringify(rtiRes, null, 2); // Convert object to a pretty-printed JSON string

  res.render("subscribe", { rtiResString });
});


app.get("/redirect", (req, res) => {
  res.sendFile(__dirname + "/frontend/redirect.html");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
