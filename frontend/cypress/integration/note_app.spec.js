describe("Note app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, Florida International University, 2022"
    );
  });

  it("login form can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.cotains("login").click();
  });
});
