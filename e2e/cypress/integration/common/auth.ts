import { Given, Then } from "cypress-cucumber-preprocessor/steps";

const url = "https://google.com";
Given("認証済", () => {
  cy.visit(url);
});
