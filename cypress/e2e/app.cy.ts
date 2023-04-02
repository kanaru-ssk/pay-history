import { user } from "../fixtures/user";

describe("e2e test", () => {
  it("can budgeting", () => {
    // visit
    cy.visit("/");
    cy.task("log", "visit");

    // sign in
    cy.get('button[name="menu-open"]').click();
    cy.get('a[href="/signIn"]').click();
    cy.location("pathname").should("include", "/signIn");
    cy.get('input[type="email"]').focus().type(user.email);
    cy.get('input[type="password"]').focus().type(user.password);
    cy.get('button[type="submit"]').click();
    cy.contains(user.email);
    cy.task("log", "sign in");

    // check loading is done
    cy.get("header").should("exist");
    cy.get('div[data-cy="skelton"]').should("not.exist");

    // check whether already started budgeting
    cy.get("main").then((main) => {
      if (main.find("form").length) {
        cy.task("log", "already started budgeting");
      } else {
        cy.task("log", "start budgeting");
        cy.get('button[name="cta"]').first().click();
      }
    });

    // delete all payment data
    cy.get('div[data-cy="payments-table"]').then((table) => {
      if (0 < table.children().length) {
        table.children().each(() => {
          cy.get('div[data-cy="payments-table"]').children().first().click();
          cy.get('button[name="delete"]').click();
          cy.get('div[data-cy="modal"]').should("not.exist");
        });
      }
      cy.contains("No payment data");
    });
    cy.task("log", "delete all payment data");

    // edit budget
    cy.get('span[data-cy="budget"').click();
    cy.get('input[name="budget"]').clear();
    cy.get('input[name="budget"]').focus().type("1000000");
    cy.get('button[name="edit"]').click();
    cy.task("log", "edit budget");

    // check budget table value
    cy.get('span[data-cy="budget"]').contains("1,000,000");
    cy.get('span[data-cy="remaining"]').contains("1,000,000");
    cy.get('div[data-cy="total-spending"]').contains("¥ 0");
    cy.task("log", "budget table displays correctly");

    // add payment data
    cy.get('input[name="amount"]').focus().type("10000");
    cy.get('button[name="add"]').click();
    cy.get('input[name="amount"]').clear();
    cy.get('input[name="amount"]').focus().type("1000");
    cy.get('button[name="add"]').click();
    cy.get('input[name="amount"]').clear();
    cy.get('input[name="amount"]').focus().type("100");
    cy.get('button[name="add"]').click();
    cy.task("log", "add payment data");

    // check payments table display
    cy.get('div[data-cy="payments-table"]').contains("10,000");
    cy.get('div[data-cy="payments-table"]').contains("1,000");
    cy.get('div[data-cy="payments-table"]').contains("100");
    cy.task("log", "payments table displays correctly");

    // check budget table value
    cy.get('span[data-cy="budget"]').contains("1,000,000");
    cy.get('span[data-cy="remaining"]').contains("988,900");
    cy.get('div[data-cy="total-spending"]').contains("11,100");
    cy.task("log", "budget table displays correctly");

    // delete a payment data
    cy.get('div[data-cy="payments-table"]').children().first().click();
    cy.get('button[name="delete"]').click();
    cy.task("log", "delete payment data");

    // edit a payment data
    cy.get('div[data-cy="payments-table"]').children().first().click();
    cy.get('input[name="edit"]').clear();
    cy.get('input[name="edit"]').focus().type("100000");
    cy.get('button[name="edit"]').click();
    cy.task("log", "edit payment data");

    // check payments table display
    cy.get('div[data-cy="payments-table"]').contains("100,000");
    cy.get('div[data-cy="payments-table"]').contains("10,000");
    cy.task("log", "payments table displays correctly");

    // check budget table value
    cy.get('span[data-cy="budget"]').contains("1,000,000");
    cy.get('span[data-cy="remaining"]').contains("890,000");
    cy.get('div[data-cy="total-spending"]').contains("110,000");
    cy.task("log", "budget table displays correctly");
  });
});

export {};
