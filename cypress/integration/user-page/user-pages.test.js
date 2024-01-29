it.only('sign-page', () => {
  cy.signIn(
    Cypress.env('CYPRESS_TEST_USER_EMAIL'),
    Cypress.env('CYPRESS_TEST_USER_PASSWORD')
  );

  cy.visit('/user');

  cy.findByRole('heading', { name: /sign in to your account/i }).should(
    'not.exist'
  );

  cy.findByRole('button', { name: /Purchase more tickets/i }).click();

  cy.findByRole('heading', { name: /Upcoming Shows/i }).should('exist');
});
