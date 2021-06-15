context("Actions", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/actions");
  });
  it(".type() - type into a DOM element", () => {
    cy.findByLabelText("unko").should("unko");
  });
});
