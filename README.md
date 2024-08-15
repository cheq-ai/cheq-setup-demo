# Cheq Adserver Automation Demo Site

This is a simple demo site that demonstrates cheq's adserver/core functionality.    
This site should be publicly available at https://square-jennica-cheq-fcc8de3e.koyeb.app/   
core automation project: https://gitlab.com/ct-dev/qa/core-test-automation    

## Getting Started

run locally: npm run start -> go to http://localhost:5000

## Behind the Scenes

This service operates by using Cheq's RTI (Defend) and SLP (Form-Guard) middlewares: https://www.npmjs.com/package/@cheq.ai/cheq-middlewares
Express middlewares github repo: https://github.com/cheq-ai/cheq-middlewares
To contribute to the middleware project - push with a new package.json version to main -> the CICD (github workflows) will take it from there and publish the package

## Contribution

To contribute to this project the repo is here: https://github.com/cheq-ai/cheq-setup-demo and the host is https://www.koyeb.com/

## references:

Host: https://app.koyeb.com/
Demo site: https://square-jennica-cheq-fcc8de3e.koyeb.app/
Demo site repo: https://github.com/cheq-ai/cheq-setup-demo
rti middleware repo: https://github.com/cheq-ai/cheq-middlewares
rti middleware npm: https://www.npmjs.com/package/@cheq.ai/cheq-middlewares?activeTab=code