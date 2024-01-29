import { generateNewReservation } from '@/__tests__/__mocks__/fakeData/newReservation';
import { generateRandomId } from '@/lib/features/reservations/utils';
const ONE_SECOND = 1000;
const THIRTY_SECOND = 30 * ONE_SECOND;
const FIFTEEN_SECONDS = 15 * 1000;
it('should refresh  the shows page  after 30 seconds ', () => {
  cy.clock();
  cy.task('db:rest').visit('/shows');
  cy.findAllByText(/sold out/i).should('have.length', 1);

  const newReservation = generateNewReservation({
    reservationId: generateRandomId,
    showId: 0,
    seatCount: 10,
  });

  cy.task('addReservation', newReservation);
  cy.tick(ONE_SECOND);
  cy.findAllByText(/sold out/i).should('have.length', 1);
  cy.tick(THIRTY_SECOND);
  cy.findAllByText(/sold out/i).should('have.length', 2);
  // cypress.restDbAndClearIsr()
});

it('should refresh the reservations page after 15 second', () => {
  cy.clock();
  cy.task('db:rest').visit(`/reservations/0`);

  cy.findByRole('main').within(() => {
    cy.findByRole('button', { name: /sign in/i }).click();
  });

  cy.findAllByText(/10 seats left/i).should('exist');

  const newReservation = generateNewReservation({
    reservationId: generateRandomId,
    showId: 0,
    seatCount: 10,
  });

  cy.task('addReservation', newReservation);
  cy.tick(ONE_SECOND);
  cy.findAllByText(/10 seats left/i).should('exist');
  cy.tick(FIFTEEN_SECONDS);

  cy.findAllByText(/Show is sold out!/i).should(
    'exist'
  );
});
