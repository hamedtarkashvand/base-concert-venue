it('slip client-side bundle', () => {
  cy.request('/shows')
    .its('body')
    .then((html) => {
      // remove the application code bundle
      html = html.replace('<script src="/bundle.js"></script>', '');
      cy.state('document').write(html);
    });

  cy.findAllByText(/2022 apr 1[567]/i).should('have.length', 3);
});
