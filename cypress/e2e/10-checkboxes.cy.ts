describe('Demo QA', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/checkbox`);
  });

  it('Checkbox scenario', () => {
    cy.get(`input[type="checkbox"]`).click({force: true});
    // * home desktop ... 이건 각 단어가 html tag로 분리되어있는데, 이런걸 assertion 하는건 그냥 오류 내보고 오류 콘솔에 찍힌 값을 그대로 쓰면 되는것이다.
    cy.get('#result').should(
      'contain.text',
      'You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile',
    );
  });
});

describe.only('The internet app', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('theInternet')}/checkboxes`);
  });

  it('Checkbox scenario', () => {
    // * eq는 get()으로 쿼리한 DOM이 여러개라 배열일 때 eq(index) 를 통해 index번째 요소를 가져올 수 있다. 사실 id같은 셀렉터를 넣는게 올은 방법.
    cy.get('form#checkboxes input').eq(0).click().should('be.checked');
    cy.get('form#checkboxes input').eq(1).click().should('not.be.checked');
  });
});
