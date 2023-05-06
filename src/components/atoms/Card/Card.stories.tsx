import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '.';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
