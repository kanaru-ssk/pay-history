import { user } from "../fixtures/user";

describe("e2e test", () => {
  it("can budgeting in japanese mode", () => {
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
    cy.contains("aaa@aaa.aaa");
    cy.task("log", "sign in");

    // check loading is done
    cy.get("header").should("exist");
    cy.get(".animate-spin").should("not.exist");

    // check whether already started budgeting
    cy.get("main").then((main) => {
      if (main.find("input").length) {
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
          cy.get('button[name="edit-menu"]').first().click();
          cy.get('button[name="delete"]').click();
        });
      }
      cy.contains("支払いデータがありません。");
    });
    cy.task("log", "delete all payment data");

    // edit budget
    cy.get('input[name="budget"]').clear();
    cy.get('input[name="budget"]').focus().type("1000000");
    cy.task("log", "edit budget");

    // check budget table value
    cy.get('input[name="budget"]').should("have.value", "¥ 1,000,000");
    cy.get('td[data-cy="total-spending"]').contains("¥ 0");
    cy.get('td[data-cy="remaining"]').contains("¥ 1,000,000");
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
    cy.get('input[name="budget"]').should("have.value", "¥ 1,000,000");
    cy.get('td[data-cy="total-spending"]').contains("¥ 11,100");
    cy.get('td[data-cy="remaining"]').contains("¥ 988,900");
    cy.task("log", "budget table displays correctly");

    // delete a payment data
    cy.get('button[name="edit-menu"]').first().click();
    cy.get('button[name="delete"]').click();
    cy.task("log", "delete payment data");

    // edit a payment data
    cy.get('button[name="edit-menu"]').first().click();
    cy.get('input[name="edit"]').clear();
    cy.get('input[name="edit"]').focus().type("100000");
    cy.get('button[name="edit"]').click();
    cy.task("log", "edit payment data");

    // check payments table display
    cy.get('div[data-cy="payments-table"]').contains("100,000");
    cy.get('div[data-cy="payments-table"]').contains("10,000");
    cy.task("log", "payments table displays correctly");

    // check budget table value
    cy.get('input[name="budget"]').should("have.value", "¥ 1,000,000");
    cy.get('td[data-cy="total-spending"]').contains("¥ 110,000");
    cy.get('td[data-cy="remaining"]').contains("¥ 890,000");
    cy.task("log", "budget table displays correctly");
  });
});

export {};
