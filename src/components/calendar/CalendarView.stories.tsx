import React from 'react';
import CalendarView from './CalendarView.js';
import { CalendarEvent } from './CalendarView.type.js';

export default {
  title: 'Components/CalendarView',
  component: CalendarView,
};

const today = new Date();
const sampleEvents: CalendarEvent[] = [
  { id: 'evt-1', title: 'Standup', startDate: today, endDate: new Date(today.getTime() + 30*60000), color: '#3b82f6' },
  { id: 'evt-2', title: 'Design', startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 14,0), endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 15,30), color: '#10b981' },
];

export const Default = () => <CalendarView events={sampleEvents} onEventAdd={() => {}} onEventUpdate={() => {}} onEventDelete={() => {}} />;

export const Empty = () => <CalendarView events={[]} onEventAdd={() => {}} onEventUpdate={() => {}} onEventDelete={() => {}} />;

export const ManyEvents = () => {
  const manyEvents = Array.from({ length: 25 }).map((_: any, i: number) => ({
    id: `evt-${i}`,
    title: `Event ${i+1}`,
    startDate: new Date(today.getFullYear(), today.getMonth(), (i % 28) + 1, 10, 0),
    endDate: new Date(today.getFullYear(), today.getMonth(), (i % 28) + 1, 11, 0),
    color: ['#3b82f6','#10b981','#f59e0b'][i%3]
  }));
  return <CalendarView events={manyEvents} onEventAdd={() => {}} onEventUpdate={() => {}} onEventDelete={() => {}} />;
};

export const Interactive = () => <CalendarView events={sampleEvents} onEventAdd={() => {}} onEventUpdate={() => {}} onEventDelete={() => {}} />;
