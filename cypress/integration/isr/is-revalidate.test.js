import { generateNewBand } from '../../../__tests__/__mocks__/fakeData/newBand';
import { generateNewShow } from '../../../__tests__/__mocks__/fakeData/newShow';
import { generateRandomId } from '@/lib/features/reservations/utils';
it('should  load refreshed page from catch after new band is added', () => {
  // check that new new band  is not on page
  cy.task('db:rest').visit('/bands');
  cy.findByRole('heading', { name: /Avalanche of Cheese/i }).should(
    'not.exist'
  );

  const bandId = generateRandomId();
  const band = generateNewBand(bandId);
  const secret = Cypress.env('REVALIDATION_SECRET');

  cy.request('POST', `/api/bands?secret=${secret}`, { newBand: band }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );
  // reload page new band should appear
  cy.reload();
  cy.findByRole('heading', { name: /Avalanche of Cheese/i }).should('exist');

  cy.restDbAndClearIsr();
});


it('should  load refreshed page from catch after new show is added', () => {
  // check that new new band  is not on page
  cy.task('db:rest').visit('/shows');
  cy.findByRole('heading', { name: /Avalanche of Cheese/i }).should('not.exist');

  const showId = generateRandomId();
  const show = generateNewShow(showId);
  const secretCode = Cypress.env('REVALIDATION_SECRET');
  cy.request('POST', `/api/shows?secret=${secretCode}`, { newShow: show }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );

  cy.reload()
  cy.findByRole('heading', { name: /Avalanche of Cheese/i }).should('exist');
  
  cy.restDbAndClearIsr();
});
