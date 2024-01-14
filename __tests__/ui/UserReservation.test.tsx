import { UserReservations } from '@/components/user/UserReservations';
import { screen, render } from '@testing-library/react';

describe('testing components UserReservations when have Reservation show or not have Reservation show', () => {
  test('should have reservations and check button Purchase more tickets and not found Purchase tickets button', async () => {
    render(<UserReservations userId={1} />);
    const buttonPurchase = await screen.findByText(/Purchase more tickets/i);
    expect(buttonPurchase).toBeInTheDocument();

    const buttonPurchaseMore = screen.queryByRole('button', {
      name: /Purchase tickets/i,
    });
    expect(buttonPurchaseMore).not.toBeInTheDocument();
  });

  test('should have reservations and check button Purchase more tickets ', async () => {
    render(<UserReservations userId={0} />);

    const buttonPurchaseMore = await screen.findByRole('button', {
      name: /Purchase tickets/i,
    });
    expect(buttonPurchaseMore).toBeInTheDocument();

    const buttonPurchase = screen.queryByText(/Purchase more tickets/i);
    expect(buttonPurchase).not.toBeInTheDocument();
  });
});
