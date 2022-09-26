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
  it('find by class', () => {
    cy.xpath(
      "//button[contains(concat(' ', normalize-space(@class), ' '), ' btn-primary ')]",
    ).should('have.css', 'background-color', 'rgb(0, 123, 255)'); // cypress는 css의 color들을 hex가 아닌 rgb로만 인식한다..
  });
});
