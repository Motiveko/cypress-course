describe('Alerts', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('theInternet')}/javascript_alerts`);
  });

  it('JS Alert', () => {
    cy.contains('button', 'Click for JS Alert').click();
    cy.on('window:alert', text => {
      expect(text).to.be.equal('I am a JS Alert');
    });

    // cy.on('window:confirm', () => true); // alert창은 어차피 confirm true 밖에 없기때문에 이건 없어도 상관없다.
    cy.get('#result').should('have.text', 'You successfully clicked an alert');
  });
  it('JS Confirm(accept)', () => {
    cy.contains('button', 'Click for JS Confirm').click();
    cy.on('window:confirm', text => {
      expect(text).to.be.equal('I am a JS Confirm');
      return true;
    });
    cy.get('#result').should('have.text', 'You clicked: Ok');
  });
  it('JS Confirm(cancel)', () => {
    cy.contains('button', 'Click for JS Confirm').click();
    cy.on('window:confirm', text => {
      expect(text).to.be.equal('I am a JS Confirm');
      return false;
    });
    cy.get('#result').should('have.text', 'You clicked: Cancel');
  });
  it('JS Prompt', () => {
    const promptText = 'prompt text';
    cy.window().then(window => {
      cy.stub(window, 'prompt').callsFake(() => promptText);
    });
    cy.contains('Click for JS Prompt').click();
    cy.get('#result').should('have.text', `You entered: ${promptText}`);
  });
});
