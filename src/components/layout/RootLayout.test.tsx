import { render, screen } from '@testing-library/react';
import RootLayout from './RootLayout';
import { ThemeProvider } from 'next-themes';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const testMessage = 'Test Content';
    render(
      <ThemeProvider>
        <RootLayout>
          <div>{testMessage}</div>
        </RootLayout>
      </ThemeProvider>
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('applies correct base classes', () => {
    render(
      <ThemeProvider>
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      </ThemeProvider>
    );

    const main = screen.getByRole('main');
    expect(main).toHaveClass('container', 'mx-auto', 'px-4', 'py-8');
  });
});
