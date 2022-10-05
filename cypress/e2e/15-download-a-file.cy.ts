describe('Download a file in the QA Demo site', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/upload-download`);
  });
  it('Download the file', () => {
    cy.get('a#downloadButton').click();
    cy.verifyDownload('sampleFile.jpeg'); // 크롬에서 실제로 파일을 다운로드하고, 프로젝트의 cypress/download 폴더에 저장하게 된다. 이름 중복되면 그냥 덮어쓴다.
  });
});
