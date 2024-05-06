describe('Load', () => {
  it('should load the page', () => {
    cy.visit(`http://localhost:${Cypress.env('ROMCAL_APP_PORT')}`);
    cy.get('h1').should('have.text', 'romcal');
    cy.get('p').should('have.text', 'Open the developer tools and check the console.');

    cy.get('#calendar').find('div').should('have.length', 2).as('messages');
    cy.get('@messages').eq(0).should('have.text', 'All definitions, which are all possible liturgical days of a specific calendar, that can occur during a whole year:');
    cy.get('@messages').eq(1).should('have.text', 'A calendar that contains all liturgical days occurring during 2024:');

    cy.get('#calendar').find('pre').should('have.length', 2).as('codes');
    cy.get('@codes').eq(0).should('include.text', 'mary_mother_of_god');
    cy.get('@codes').eq(1).should('include.text', 'mary_mother_of_god');
  });
});
