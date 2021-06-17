import { Given, Then } from "cypress-cucumber-preprocessor/steps";

const url = "https://google.com";
Given("ユーザーが存在しない", () => {
  cy.visit(url);
});

Then(`I see {string} in the title`, (title) => {
  cy.title().should("include", title);
});
