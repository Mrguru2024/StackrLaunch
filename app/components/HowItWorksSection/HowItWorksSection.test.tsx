import { render, screen } from '@testing-library/react';
import HowItWorksSection from './index';

describe('HowItWorksSection', () => {
  it('renders the section title and description', () => {
    render(<HowItWorksSection />);

    expect(screen.getByText('How StackZen Works')).toBeInTheDocument();
    expect(
      screen.getByText('Four simple steps to automate your finances and grow your wealth')
    ).toBeInTheDocument();
  });

  it('renders all four steps with their titles and descriptions', () => {
    render(<HowItWorksSection />);

    // Check for all step titles
    expect(screen.getByText('Secure Connection')).toBeInTheDocument();
    expect(screen.getByText('AI Analysis')).toBeInTheDocument();
    expect(screen.getByText('Time Savings')).toBeInTheDocument();
    expect(screen.getByText('Wealth Growth')).toBeInTheDocument();

    // Check for step descriptions
    expect(
      screen.getByText(/Connect your financial accounts with bank-level encryption/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Our AI automatically analyzes your transactions/)).toBeInTheDocument();
    expect(
      screen.getByText(/Automate your financial tracking and save 5\+ hours monthly/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Get personalized insights to optimize your income/)
    ).toBeInTheDocument();
  });

  it('renders the correct number of step cards', () => {
    render(<HowItWorksSection />);

    const stepCards = screen.getAllByRole('heading', { level: 3 });
    expect(stepCards).toHaveLength(4);
  });
});
