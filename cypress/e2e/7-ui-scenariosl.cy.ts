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

describe('Hover Challange', () => {
  beforeEach(() => {
    cy.visit('/mouseover');
  });

  // 구린 방법이다.
  it('cypress workaround를 이용한 hover(cypree native)', () => {
    cy.get('.text-primary')
      .should('have.class', 'text-primary')
      .trigger('mouseenter');
    cy.get('.text-warning');
  });

  it('cypress-real-events를 이용한 hover', () => {
    cy.get('.text-primary').should('have.class', 'text-primary').realHover();
    // .should('have.css', 'color', 'rgb(211, 158, 0)'); // 이경우 hover한 내부 DOM요소가 새로 교체되면 말짱 도루묵이된다.
    cy.get('.text-warning');
  });
});

describe('Dynamic table challenge', () => {
  beforeEach(() => {
    cy.visit('/dynamictable');
  });

  it('Chrome CPU Test', () => {
    cy.get(`div[role="row"] span`).each($cell => {
      if ($cell.text().includes('Chrome')) {
        let chromeRowValues: string[] = [];
        chromeRowValues.push($cell.next().text());
        chromeRowValues.push($cell.next().next().text());
        chromeRowValues.push($cell.next().next().next().text());
        chromeRowValues.push($cell.next().next().next().next().text());
        chromeRowValues.forEach(chromeValue => {
          if (chromeValue.includes('%')) {
            cy.log(chromeValue);
            cy.get('.bg-warning').should(
              'have.text',
              `Chrome CPU: ${chromeValue}`,
            );
          }
        });
      }
    });
  });

  it('(나의 커스텀) Chrome CPU Test', () => {
    const COLUMN_LENGTH = 5;
    let CPU_COLUMN: number;
    cy.get(`span[role="columnheader"]`)
      .should('have.length', COLUMN_LENGTH)
      .each(($cell, col) => {
        if ($cell.text() === 'CPU') {
          CPU_COLUMN = col;
        }
      });

    let CHROME_CPU: number;
    cy.get(`span[role="cell"]`).each(($cell, index) => {
      if ($cell.text() === 'Chrome') {
        CHROME_CPU = index + CPU_COLUMN;
        return;
      }

      if (index === CHROME_CPU) {
        cy.get('.bg-warning').should(
          'contain.text',
          `Chrome CPU: ${$cell.text()}`,
        );
      }
    });
  });
});
