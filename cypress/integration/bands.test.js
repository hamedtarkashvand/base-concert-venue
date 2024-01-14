it('should display the list of bands after clicking the Bands button', () => {
  cy.visit('/')
  cy.findByRole('button', { name: /Bands/i }).click();

  cy.findByRole('heading', { name: /Our Illustrious Performers/i }).should(
    'exist'
  );
});