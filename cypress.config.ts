import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://uitestingplayground.com',
    projectId: 'mkrumj',
    env: {
      demoVar: 'Hello from the Cypress.Config.Ts',
      demoQA: 'https://demoqa.com',
      theInternet: 'https://the-internet.herokuapp.com',
      //https://www.globalsqa.com/angularjs-protractor-practice-site/
      Angular: 'https://www.globalsqa.com',
      db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cypress_test',
      },
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  pageLoadTimeout: 60000,
  viewportHeight: 1000,
  viewportWidth: 1400,
});
