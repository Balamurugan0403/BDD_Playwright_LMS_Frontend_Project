module.exports = {
  default: {
    requireModule: ["ts-node/register"],

    require: [
      "src/test/steps/**/*.ts",
      "src/test/hooks/**/*.ts"
    ],

    paths: [
      "src/test/features/**/*.feature"
    ],

    format: [
      "allure-cucumberjs/reporter:allure-results",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html",
      "@cucumber/pretty-formatter",
      "rerun:rerun/@rerun.txt"
    ],

    parallel: 1
  },

  rerun: {
    requireModule: ["ts-node/register"],

    require: [
      "src/test/steps/**/*.ts",
      "src/test/hooks/**/*.ts"
    ],

    format: [
      "allure-cucumberjs/reporter:allure-results",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html",
      "rerun:rerun/@rerun.txt"
    ],

    parallel: 1
  }
};
