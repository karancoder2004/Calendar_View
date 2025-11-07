import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CalendarView from './CalendarView';
import { CalendarEvent } from './CalendarView.type';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/CalendarView',
  component: CalendarView,
};
export default meta;

const today = new Date();
const sampleEvents: CalendarEvent[] = [
  { id: 'evt-1', title: 'Standup', startDate: today, endDate: new Date(today.getTime() + 30*60000), color: '#3b82f6' },
  { id: 'evt-2', title: 'Design', startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 14,0), endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 15,30), color: '#10b981' },
];

type Story = StoryObj<typeof CalendarView>;

export const Default: Story = { args: { events: sampleEvents } };
export const Empty: Story = { args: { events: [] } };
export const ManyEvents: Story = { args: { events: Array.from({ length: 25 }).map((_, i) => ({ id: `evt-${i}`, title: `Event ${i+1}`, startDate: new Date(today.getFullYear(), today.getMonth(), (i % 28) + 1, 10, 0), endDate: new Date(today.getFullYear(), today.getMonth(), (i % 28) + 1, 11, 0), color: ['#3b82f6','#10b981','#f59e0b'][i%3] })) } };
export const Interactive: Story = { args: { events: sampleEvents } };
