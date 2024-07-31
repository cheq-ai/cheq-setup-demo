# Cheq Adserver Automation Demo Site

This is a simple demo site that demonstrates cheq's adserver/core functionality.    
core automation project: https://gitlab.com/ct-dev/qa/core-test-automation    
This site should be publicly available at https://square-jennica-cheq-fcc8de3e.koyeb.app/   

## Getting Started

run locally: npm run start

1. Go to the website (locally or deployed)
2. Click any link -> everything works
3. Act as an invalid user by editing your user-agent string to a bot: **Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)**
4. Click the Subscribe button -> you are now identfied as invalid and redirected to the /redirect page

## Behind the Scenes

This service operates by using Cheq's RTI middleware: https://www.npmjs.com/package/@cheq.ai/cheq-middlewares
It intercepts the request to the 'Subscribe' page and validates the visit. If invalid, redirect.

## Contribution

If you want to contribute, the repo is here: https://github.com/cheq-ai/cheq-setup-demo
