/**
 * * target: _blank 인 경우 새창이 열리는데, 이건 테스트가 불가능하다(cypress trade-offs: not support multiple browser)
 */
describe('새 창을 여는 link 테스트', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/links`, {log: false});
  });
  it('First approach, not click on the link', () => {
    cy.get('#simpleLink').should('have.attr', 'href', 'https://demoqa.com');
    cy.get('#simpleLink').should('have.attr', 'target', '_blank');
  });

  //* target: _blank를 지워버리고 테스트한다. cy.url()을 이용해서 현재 화면의 url을 테스트 할 수 있다.
  it('Second approach, remove the target', () => {
    cy.get('#simpleLink').invoke('removeAttr', 'target').click();
    cy.url().then(url => {
      expect(url).to.be.equal('https://demoqa.com/');
    });
  });
});

/**
 * *http request를 intercept('SPYING') 할 수 있다. 요청을 막는게 아니라 브라우저 개발자도구에서 network 탭에서 http request를 recording 하는것과 똑같은방식이다.
 */
describe('버튼클릭시 발생하는 API Request를 Intercept한다.', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/links`, {log: false});
    // GET, https://demoqa.com/create 요청을 intercept하고 alias로 linkStatus를 설정한다.
    cy.intercept('GET', `${Cypress.env('demoQA')}/created`).as('linkStatus');
  });

  it('', () => {
    cy.get('a#created').click();
    // alias에 @ prefix를 붙여서 intercept 한 요청을 assert 할 수 있다
    cy.wait('@linkStatus').then(request => {
      cy.log('This is the request intercepted', request);
      expect(request.response.statusCode).to.be.equal(201);
      expect(request.response.statusMessage).to.be.equal('Created');
    });
  });
});

/**
 * * 링크 클릭시 /status_codes/{CODE} 로 이동한다. 이 때 응답 코드 테스트
 */
describe('internet app test', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('theInternet')}/status_codes`);
    cy.intercept('GET', `/status_codes/**`).as('request');
  });

  it('200 api', () => {
    cy.contains('200').click();
    cy.wait('@request').then(request => {
      expect(request.response.statusCode).to.be.equal(200);
    });
  });

  it('301 api', () => {
    cy.contains('301').click();
    cy.wait('@request').then(request => {
      expect(request.response.statusCode).to.be.equal(301);
    });
  });
  it('404 api', () => {
    cy.contains('404').click();
    cy.wait('@request').then(request => {
      expect(request.response.statusCode).to.be.equal(404);
    });
  });
});
