describe('Locators', () => {
  beforeEach(() => {
    cy.visit('/dynamicid');
  });

  it('cy.contains example', () => {
    cy.contains('Button with Dynamic ID').should(
      'have.text',
      'Button with Dynamic ID',
    );
  });

  it('cy.get + cy.find', () => {
    cy.get('div').find('button').should('have.text', 'Button with Dynamic ID');
  });

  it('css selector using an attribute', () => {
    cy.get('button[class="btn btn-primary"]').should(
      'have.text',
      'Button with Dynamic ID',
    );
  });

  it('css selector using an class', () => {
    cy.get('button.btn-primary').should('have.text', 'Button with Dynamic ID');
  });
});
