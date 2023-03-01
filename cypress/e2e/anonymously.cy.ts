describe("test", () => {
  it("can visit google", () => {
    cy.visit("https://google.com");
  });

  it("can visit localhost", () => {
    cy.visit("/");
  });
});

export {};
