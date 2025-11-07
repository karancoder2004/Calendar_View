import { useState } from 'react';
import { CalendarEvent } from '@/components/calendar/CalendarView.type';

export const useEventManager = (initial: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initial);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const addEvent = (ev: CalendarEvent) => setEvents(prev => [...prev, ev]);
  const updateEvent = (id: string, updates: Partial<CalendarEvent>) =>
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  const openEvent = (ev: CalendarEvent | null) => setSelectedEvent(ev);
  const closeEvent = () => setSelectedEvent(null);

  return { events, addEvent, updateEvent, deleteEvent, selectedEvent, openEvent, closeEvent, setEvents };
};
