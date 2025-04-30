import type { Meta, StoryObj } from '@storybook/react';
import RootLayout from './RootLayout';
import { ThemeProvider } from 'next-themes';

const meta: Meta<typeof RootLayout> = {
  title: 'Layout/RootLayout',
  component: RootLayout,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof RootLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sample Content</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          This is a sample content to demonstrate the RootLayout component.
        </p>
      </div>
    ),
  },
};

export const WithLongContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Section {i + 1}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              This is a longer section of content to demonstrate how the layout handles multiple
              sections.
            </p>
          </div>
        ))}
      </div>
    ),
  },
};
