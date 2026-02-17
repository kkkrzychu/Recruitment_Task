exports.config = {
  output: './allure-results',
  helpers: {
    REST: {
      endpoint: 'https://dummyjson.com'
    },
    JSONResponse: {}
  },
  include: {
    I: './steps_file'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.ts']
  },
  plugins: {
    screenshotOnFail: {
      enabled: false
    },
    allure: {
      enabled: true,    
      //resultsdir: 'output/allure-results',
     // resultsDir: "allure-results",  
      require: '@codeceptjs/allure-legacy',
      screenshotsForAllureReport: false
    },
    htmlReporter: {
      enabled: false
    },
    retryFailedStep: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './*_test.ts',
  name: 'APITest.DummyJSON'
}