import Home from '@/pages'
import { render, screen } from '@testing-library/react'

test('has corect this in page and image ', () => {
  render(<Home />);
  const heading = screen.getByRole('heading', {
    name: 'Welcome to Popular Concert Venue',
  });
  expect(heading).toBeInTheDocument();

  const img = screen.getByRole('img', {
    name: 'Concert goer with hands in the shape of a heart',
  });
  expect(img).toBeInTheDocument();
  
})