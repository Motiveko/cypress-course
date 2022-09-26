describe('Retry ability demo', () => {
  it('Visit with delay', () => {
    cy.visit('/loaddelay', {
      timeout: 15000,
    });
  });

  it('client side delay', () => {
    cy.visit('/clientdelay');
    cy.get('#ajaxButton').click();
    cy.get('.bg-success', {timeout: 15500}).should(
      'have.text',
      'Data calculated on the client side.',
    );
  });
  it.only('progress bar scenario', () => {
    cy.visit('/progressbar');
    cy.get('#startButton').click();
    cy.get('#progressBar', {timeout: 25000}).should('have.text', '75%'); // element에 timeout을 주면 그 뒤에 체이닝되는 assertion에도 timeout이 적용된다.
    cy.get('#startButton').click();
  });
});
