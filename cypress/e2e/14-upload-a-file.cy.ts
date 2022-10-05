describe('Upload a file in the QA Demo site', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/upload-download`);
  });

  it('Upload the file', () => {
    const filename = 'example.json';
    cy.get('#uploadFile').attachFile(filename);
    cy.get('#uploadedFilePath').should('contains.text', filename);
  });
});
