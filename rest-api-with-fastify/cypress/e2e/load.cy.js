describe('Load', () => {
  it('should load the page', () => {
    cy.intercept('/romcal/general-roman/en', { fixture: 'general-roman-en.html' }).as('general-roman-en');

    cy.visit('http://localhost:3000');
    cy.get('h1').should('have.text', 'romcal v3');
    cy.get('ul').should('have.length', 2);
    cy.get('ul').eq(0).as('general-roman').find('li').should('have.length', 10);
    cy.get('ul').eq(1).find('li').should('have.length', 1);

    cy.get('@general-roman').find('li').eq(0).should('have.text', '/romcal/general-roman/cs');
    cy.get('@general-roman').find('li').eq(1).should('have.text', '/romcal/general-roman/en').as('en');

    cy.get('@en').find('a').click();
    cy.wait('@general-roman-en');
    cy.get('pre').should('include.text', 'mary_mother_of_god');
    cy.get('pre').should('include.text', 'maryMotherOfGod');
  });
});
