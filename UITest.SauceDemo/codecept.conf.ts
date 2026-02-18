exports.config = {
  //tests: 'C:\DEV\automation-recruitment-task\UITest.SauceDemo\step_definitions\steps.ts',
  output: './allure-results',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.saucedemo.com',
      show: false,
    }
  },
  include: {
    I: './steps_file'
  },
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
      require: '@codeceptjs/allure-legacy',
      screenshotsForAllureReport: false
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
  name: 'UITest.SauceDemo'
}