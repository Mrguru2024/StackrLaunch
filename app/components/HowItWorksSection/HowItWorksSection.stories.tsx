import type { Meta, StoryObj } from '@storybook/react';
import HowItWorksSection from './index';

const meta: Meta<typeof HowItWorksSection> = {
  title: 'Sections/HowItWorksSection',
  component: HowItWorksSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HowItWorksSection>;

export const Default: Story = {
  args: {},
};
