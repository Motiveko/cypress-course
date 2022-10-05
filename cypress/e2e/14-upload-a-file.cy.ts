describe('Upload a file in the QA Demo site', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/upload-download`);
  });

  it('Upload the file', () => {
    cy.get('#uploadFile').attachFile('example.json');
  });
});
