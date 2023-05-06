import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '.';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { checked: true } };
