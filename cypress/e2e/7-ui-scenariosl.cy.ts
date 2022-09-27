describe('Click Challenge', () => {
  beforeEach(() => {
    cy.visit('/click');
  });
  it('class assertions', () => {
    cy.get('#badButton')
      .should('have.class', 'btn-primary')
      .click()
      .should('have.class', 'btn-success');
  });
  it('background assertions', () => {
    cy.get('#badButton')
      .should('have.css', 'background-color', 'rgb(0, 123, 255)')
      .click()
      .should('have.css', 'background-color', 'rgb(40, 167, 69)');
  });
});

describe.only('Hover Challange', () => {
  beforeEach(() => {
    cy.visit('/mouseover');
  });

  it('hover with cypress workaround', () => {
    cy.get('.text-primary')
      .should('have.class', 'text-primary')
      .trigger('mouseenter');
    cy.get('.text-warning');
  });
  it('hover with real hover elements', () => {
    cy.get('.text-primary').should('have.class', 'text-primary').realHover();
    // .should('have.css', 'color', 'rgb(211, 158, 0)'); // 이경우 hover한 내부 DOM요소가 새로 교체되면 말짱 도루묵이된다.
    cy.get('.text-warning');
  });
});
