import '@testing-library/cypress/add-commands';

Cypress.Commands.add('restDbAndClearIsr' as any, () => {
  cy.task('db:rest');
  const secret = Cypress.env('REVALIDATION_SECRET');

  cy.request('GET', `/api/revalidate?secret=${secret}`);
});

Cypress.Commands.add('signIn', (email, password) => {
  cy.visit('/auth/signin');

  cy.findByLabelText(/Email address/i)
    .clear()
    .type(email);
  cy.findByLabelText(/Password/i)
    .clear()
    .type(password);

  cy.findByRole('main').within(() => {
    cy.findByRole('button', { name: /Sign in/i }).click();
  });

  cy.findByRole('heading', { name: /Welcome/i });
});
