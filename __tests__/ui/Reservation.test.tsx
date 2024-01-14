import { render, screen } from '@testing-library/react';
import { Reservation } from '@/components/reservations/Reservation';
describe('testing Reservation', () => {
  test('testing count seats left ', async () => {
    render(
      <Reservation
        showId={0}
        submitPurchase={jest.fn()}
      />
    );

    const showCountSeatsLeft = await screen.findByText(/10 seats left/i);
    expect(showCountSeatsLeft).toBeInTheDocument();
  });

  test('should display label show is sold out when availableSeatCount = 0', async () => {
    render(
      <Reservation
        showId={1}
        submitPurchase={jest.fn()}
      />
    );
    const buttonPurchase = await screen.findByRole('heading', {
      name: /Show is sold out!/i,
    });
    expect(buttonPurchase).toBeInTheDocument();

    const purchaseButton = screen.queryByRole('button', {
      name: /purchase/i,
    });

    expect(purchaseButton).not.toBeInTheDocument();
  });
});
