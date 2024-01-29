it('e2e testing flow user reservation tickets', () => {
  cy.task('db:rest').visit('/');
  cy.findByRole('button', {
    name: /show/i,
  }).click();

  cy.findAllByRole('button', { name: /tickets/i })
    .last()
    .click();
  
    cy.findByLabelText(/Email address/i)
      .clear()
      .type(Cypress.env('CYPRESS_TEST_USER_EMAIL'));
    cy.findByLabelText(/Password/i)
      .clear()
      .type(Cypress.env('CYPRESS_TEST_USER_PASSWORD'));

    cy.findByRole('main').within(() => {
      cy.findByRole('button', { name: /Sign in/i }).click();
    });

  cy.findByRole('heading', { name: /100 seats left/i });

  cy.findByRole('spinbutton').clear().type('5');
  cy.findByRole('button', { name: /purchase/i }).click();

  cy.findByText(/5 seats confirmed fo/i).should('exist');

  cy.findByRole('button', { name: /Purchase more tickets/i }).click();

  cy.findAllByRole('button', { name: 'tickets' }).last().click();

  cy.findByRole('heading', { name: /95 seats left/i }).should('exist');
});
