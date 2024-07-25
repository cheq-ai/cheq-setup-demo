// env: staging
// net id 8914
// search id 50193
// bot useragent string: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)

const express = require("express");
const app = express();
const { rti, eventsTypes } = require("@cheq.ai/cheq-middlewares");
const path = require("path");
const { apiEndpoints } = require("@cheq.ai/cheq-middlewares/config");

const PORT = process.env.PORT || 5000;
const options = {
  apiKey: "ca9635f4-81fc-4dc4-9f2f-d4a78680787f",
  tagHash: "86236b7f11f14e894e0263ad7f7df9a0",
  apiEndpoint: apiEndpoints.DEV,
  mode: "blocking",
  threatTypesCodes: {
    blockRedirect: [2, 3, 6, 10, 11, 16, 18,29], // 11 = FALSE REPRESENTATION -> block & redirect (redirectUrl)
    captcha: [4, 5, 13, 14, 15, 17, 7], // 7 = DISABLED JS -> block & navigate to captcha.html (callback)
  },
  redirectUrl: "https://google.com",
  callback: function (req, res, next) {
    res.sendFile(path.join(__dirname, "./frontend", "captcha.html"));
  },
};

const middleware = rti(options);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "./frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend", "index.html"));
});

app.get("/subscribe", middleware(eventsTypes.SUBSCRIBE), function (req, res) {
  console.log(res.getHeaders());

  res.send("SUBSCRIBE PAGE");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
