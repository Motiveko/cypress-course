describe('basic', () => {
  beforeEach(() => {
    // 방문
    cy.visit('/textinput');
  });

  it('url validation', () => {
    cy.url().then(url => {
      cy.log(`Printing the URL : ${url}`);
      expect(url).to.contains('/textinput');
    });
  });

  it('title validation', () => {
    cy.title().then(title => {
      expect(title).to.be.eql('Text Input');
    });
  });

  it('Input Challenge', () => {
    cy.get('input#newButtonName').type('TEST');
    cy.get('button#updatingButton')
      .click()
      .then(button => expect(button).to.have.text('TEST'));
    // .should('have.text', 'TEST'); // TDD
  });
});
