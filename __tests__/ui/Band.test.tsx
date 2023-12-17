import BandPage from '@/pages/bands/[bandId]';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { screen, render } from '@testing-library/react';
describe('Band page testing', () => {
  beforeEach(async () => {
    const { fakeBands } = await readFakeData();
    render(
      <BandPage
        band={fakeBands[0]}
        error={null}
      />
    );
  });
  test('should have text content ', () => {
    const heading = screen.getByRole('heading', {
      name: /The Wandering Bunnies/i,
    });
    expect(heading).toBeInTheDocument();

    const image = screen.getByAltText('band photo');
    expect(image?.alt).toContain('band photo');
  });

  test('should have error message ', async () => {
    render(
      <BandPage
        band={null}
        error={'not data'}
      />
    );

    const heading = screen.getByRole('heading', {
      name: 'Could not retrieve band data: not data',
    });
    expect(heading).toBeInTheDocument();

    const alertContent = screen.getByText(
      'Could not retrieve band data: not data',
      { exact: true }
    );

    expect(alertContent).toHaveTextContent(/not data/);
  });
});