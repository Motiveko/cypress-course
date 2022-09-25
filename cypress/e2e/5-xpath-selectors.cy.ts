describe('Locators', () => {
  beforeEach(() => {
    cy.visit('/classattr');
  });
  it('how to find an element by its text', () => {
    cy.xpath('//*[text()="Correct variant is"]').should(
      'contain.text',
      'Correct',
    );
  });
  it('find an element by its attribute using xpath', () => {
    cy.xpath('//pre[@class=" language-html"]').should('contain.text', 'button');
  });
});
