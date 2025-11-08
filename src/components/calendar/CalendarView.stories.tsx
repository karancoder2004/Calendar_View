import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView.tsx';
import type { CalendarViewProps, CalendarEvent } from './CalendarView.type.ts';

const sampleEvents: CalendarEvent[] = [
  { id: 1, title: 'Meeting', date: new Date() },
  { id: 2, title: 'Workout', date: new Date() },
];

const meta: Meta<CalendarViewProps> = {
  title: 'Components/CalendarView',
  component: CalendarView,
};

export default meta;
type Story = StoryObj<CalendarViewProps>;

export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event: CalendarEvent) => console.log('Add', event),
    onEventUpdate: (event: CalendarEvent) => console.log('Update', event),
    onEventDelete: (id: number) => console.log('Delete', id),
    onEventClick: (event: CalendarEvent) => console.log('Click', event),
  },
};
