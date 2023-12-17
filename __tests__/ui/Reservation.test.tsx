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
});
