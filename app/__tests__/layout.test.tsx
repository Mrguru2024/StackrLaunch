import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';
import { ThemeProvider } from 'next-themes';

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-inter-class',
    subsets: ['latin'],
  }),
}));

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const testChild = <div data-testid="test-child">Test Content</div>;

    render(<RootLayout>{testChild}</RootLayout>);

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies Inter font class to body', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const body = document.body;
    expect(body).toHaveClass('mocked-inter-class');
  });

  it('renders ThemeProvider with correct props', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toBeInTheDocument();
  });

  it('renders html with correct lang attribute and suppressHydrationWarning', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const html = document.documentElement;
    expect(html).toHaveAttribute('lang', 'en');
    expect(html).toHaveAttribute('suppressHydrationWarning', '');
  });
});
