it('runs auth flow for successful login to protected reservation page', () => {
  cy.task('db:rest').visit('/reservations/0');

  // check form sign form
  cy.findByRole('heading', { name: /Sign in to your account/i }).should(
    'exist'
  );
  // check there's no option for purchase tickets
  cy.findByRole('button', { name: /purchase/i }).should('not.exist');
  //check valid sign-in credential

  cy.findByLabelText(/Email address/i).clear();
  cy.findByLabelText(/Email address/i).type(
    Cypress.env('CYPRESS_TEST_USER_EMAIL')
  );

  cy.findByLabelText(/Password/i).clear();
  cy.findByLabelText(/Password/i).type(Cypress.env('CYPRESS_TEST_USER_PASSWORD'));

  cy.findByRole('main').within(() => {
    cy.findByRole('button', { name: /Sign in/i }).click();
  });

  cy.findByRole('button', { name: /purchase/i }).should('exist');
  cy.findByRole('button', {
    name: Cypress.env('CYPRESS_TEST_USER_EMAIL'),
  }).should('exist');
});

it('runs auth flow Failed login  to protected user page', () => {
  cy.task('db:rest').visit('/user') 
  cy.findByRole('heading', { name: `Welcome ${Cypress.env('CYPRESS_TEST_USER_EMAIL')}` }).should('not.exist')
  
  cy.findByLabelText(/Email address/i).clear()
  cy.findByLabelText(/Email address/i).type(
    'fakeEmail@gmail.com'
  );

  cy.findByLabelText(/Password/i).clear();
  cy.findByLabelText(/Password/i).type(
    '123456'
  );

  cy.findByRole('main').within(() => {
    cy.findByRole('button',{name:/Sign in/i }).click()
  })

  cy.findByText(/Sign in failed/i).should('exist')

    cy.findByLabelText(/Email address/i).clear();
    cy.findByLabelText(/Email address/i).type(
      Cypress.env('CYPRESS_TEST_USER_EMAIL')
    );

    cy.findByLabelText(/Password/i).clear();
    cy.findByLabelText(/Password/i).type(
      Cypress.env('CYPRESS_TEST_USER_PASSWORD')
    );

    cy.findByRole('main').within(() => {
      cy.findByRole('button', { name: /Sign in/i }).click();
    });
  
  cy.findByRole('heading', { name: /Welcome test@test.test/i }).should('exist');


});

it('redirect to  sign-in for protected pages', () => {
  cy.fixture('protected-pages.json').then((urls) => {
    urls.forEach(element => {
      cy.visit(element);
      cy.findAllByLabelText(/Email address/i).should('exist')
      cy.findByLabelText(/Password/i).should('exist')
    });
  })
})

