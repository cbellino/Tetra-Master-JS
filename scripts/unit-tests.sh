#!/bin/bash

# Download the code climate test reporter
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
chmod +x ./cc-test-reporter

# Run the unit tests
cd game/
yarn install
yarn test:unit
cd ../

# Upload the results to code climate
./cc-test-reporter format-coverage -t lcov -o ./coverage/coverage-code-climate.json ./coverage/lcov.info
./cc-test-reporter upload-coverage -i ./coverage/coverage-code-climate.json
