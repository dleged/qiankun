describe('Examples', () => {

  it('should navigate to the default(react16) mount app', () => {
    cy.visit('http://localhost:7099');

    cy.get('h4.subapp-loading').contains('Loading...');

    cy.wait(1000);

    cy.get('div.app-title]').contains('React Demo');

    cy.url().should('include', 'react16');
  });

  // it('should navigate to the react15 app', () => {
  //   cy.get('div.app-title]').contains('React Demo');

  //   cy.url().should('include', 'react15');
  // });


});