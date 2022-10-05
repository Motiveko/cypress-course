describe('Broken images with Demo QA', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('demoQA')}/broken`);
  });

  it('Not Broken Image Assertion', () => {
    cy.get('div > img[src="/images/Toolsqa.jpg"]')
      .should('be.visible')
      .and($img => {
        expect(
          ($img[0] as unknown as HTMLImageElement).naturalWidth,
        ).to.be.greaterThan(0);
      });
  });

  it('Broken Image Assertion', () => {
    cy.get('div > img[src="/images/Toolsqa_1.jpg"]')
      .should('be.visible')
      .and($img => {
        // cy.log 하면 Chai-jQuery assertion 관련 오류가 발생한다..
        // cy.log('Image Queried...', $img);
        expect(($img[0] as unknown as HTMLImageElement).naturalWidth).to.be.eq(
          0,
        );
      });
  });
});
