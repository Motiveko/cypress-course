describe('Auto Complete', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/auto-complete`);
  });
  it('Red', () => {
    cy.get('#autoCompleteMultipleContainer').type('E');
    cy.get('.auto-complete__menu-list > div').first().click(); // first는 자식중 첫번째가 아니다. 고른것 중 첫번째

    cy.get('.auto-complete__value-container')
      .first()
      .should('have.text', 'Red');
  });
});
