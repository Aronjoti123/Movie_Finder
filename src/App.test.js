import { render, screen } from '@testing-library/react';
import App from './App';

test('renders movie finder title', () => {
  render(<App />);
  const titleElement = screen.getByText(/🎬 Movie Finder/i);
  expect(titleElement).toBeInTheDocument();
});
