import { defineConfig } from 'cypress';
import { addBand } from './lib/features/bands/queries';
import { resetDB } from './__tests__/__mocks__/db/utils/reset-db';

export default defineConfig({
  env: {
    REVALIDATION_SECRET:process.env.REVALIDATION_SECRET,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

      on('task', {
        'db:rest': () => resetDB().then(() => null),
        addBand: async (newBand) => {
          await addBand(newBand);
          return null;
        },
      });
    },
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/integration/**/*.cy.js',
      'cypress/integration/**/*test.js',
    ],
  },
});
