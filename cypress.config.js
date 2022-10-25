const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    'baseUrl': 'http://localhost:8000',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      // implement node event listeners here
      return config;
    },
  },
  env: {
    'codeCoverage': {
      'url': 'http://localhost:8000/__coverage__',
      'expectBackendCoverageOnly': true, //! da togliere quando e' pronto il front
    }
  },
});
