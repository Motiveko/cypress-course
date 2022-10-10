describe('Iframe example', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/nestedframes`);
  });

  it('simple', () => {
    cy.get('#frame1').then($iframe => {
      // .contents() 결과가 html 요소다. 거기서 자식(head/body) 중에 body를 find 하는 형태
      const body = $iframe.contents().find('body');
      cy.wrap(body).should('have.text', 'Parent frame');
      cy.wrap(body)
        .find('iframe')
        .then($childIframe => {
          const body = $childIframe.contents().find('body');
          cy.wrap(body).find('p').should('have.text', 'Child Iframe');
        });
    });
  });
});

describe('Iframe WYSIWYG(위즈윅) 에디터 타이핑 테스트', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('theInternet')}/iframe`);
  });

  it('Iframedemo', () => {
    cy.get('#mce_0_ifr').then($iframe => {
      const body = $iframe.contents().find('body');
      cy.wrap(body)
        .type('{selectAll}{del}Hello World!')
        .should('have.text', 'Hello World!');
    });
  });
});
