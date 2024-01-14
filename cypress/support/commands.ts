import '@testing-library/cypress/add-commands';
Cypress.Commands.add('restDbAndClearIsr' as any, () => {
  cy.task('db:rest');
  const secret = Cypress.env('REVALIDATION_SECRET');

  cy.request('GET', `/api/revalidate?secret=${secret}`);
});