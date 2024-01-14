import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand';
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

  cy.request('POST',`/api/bands?secret=${secret}`, { newBand: band }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );
  // reload page new band should appear
  cy.reload();
  cy.findByRole('heading', { name: /Avalanche of Cheese/i }).should('exist');
  
  cy.restDbAndClearIsr()
});
