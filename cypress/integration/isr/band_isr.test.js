it('slip client-side bundle', () => {
  cy.request('/bands')
    .its('body')
    .then((html) => {
      // remove the application code bundle
      html = html.replace('<script src="/bundle.js"></script>', '');
      cy.state('document').write(html);
    });

  cy.findByRole('heading', { name: /The Wandering Bunnies/i }).should('exist');
  cy.findByRole('heading', { name: /Shamrock Pete/i }).should('exist');
  cy.findByRole('heading', { name: /The Joyous Nun Riot/i }).should('exist');
});
