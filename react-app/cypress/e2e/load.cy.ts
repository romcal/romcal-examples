describe('Load', () => {
  it('should load the page', () => {
    cy.visit(`http://localhost:${Cypress.env('ROMCAL_APP_PORT')}`);
  });
});
