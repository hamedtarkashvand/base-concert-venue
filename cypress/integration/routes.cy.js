import { generateRandomId } from '@/lib/features/reservations/utils';
import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand';

beforeEach(() => {
  cy.visit('/');
});

describe('should testing routs ', () => {
  it('should display the correct of heading after clicking the Show Nav button', () => {
    cy.findByRole('button', {
      name: /show/i,
    }).click();
    cy.findByRole('heading', { name: /Upcoming Shows/i }).should('exist');
  });

  it('should display the correct of heading after  the Bands Nav button', () => {
    cy.findByRole('button', { name: /Bands/i }).click();
    cy.findByRole('heading', { name: /Our Illustrious Performers/i }).should(
      'exist'
    );
  });

  it('should display correct after navigate to path exist at build time', () => {
    cy.task('db:rest').visit('bands/1');
    cy.findByRole('heading', { name: /Shamrock Pete/i }).should('exist');
  });

  it('should display error correct after navigate to path not exist at build time ', () => {
    cy.task('db:rest').visit('bands/12345');
    cy.findByText(/Error: band not found/i).should('exist');
  });

  it('should display  correct after navigate to new user  path  exist  after at build time ', () => {
    const uniqId = generateRandomId()
    const newBand = generateNewBand(uniqId)
    cy.task('db:rest').task('addBand', newBand).visit(`bands/${uniqId}`);
    cy.findByRole('heading', { name:/Avalanche of Cheese/i }).should('exist');
  });
});
