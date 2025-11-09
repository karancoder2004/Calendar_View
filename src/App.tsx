import React, { useState, useEffect, useCallback } from 'react';
import { CalendarView } from './components/calendar/CalendarView.js';
import { CalendarEvent } from './components/calendar/CalendarView.type.js';

export default function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('calendar-events');
    if (saved) {
      const parsed = JSON.parse(saved);
      const withDates = parsed.map((e: any) => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
      }));
      setEvents(withDates);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const handleEventAdd = useCallback((ev: CalendarEvent) => {
    setEvents(prev => [...prev, ev]);
  }, []);

  const handleEventUpdate = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  const handleEventDelete = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  const handleEventClick = useCallback((ev: CalendarEvent) => {
    console.log('Event clicked:', ev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-blue-950 dark:to-purple-950 p-4 sm:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-floatDelay"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-floatSlow"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-8 text-center animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slideInDown">
            Interactive Calendar
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg animate-slideInUp">
            Beautiful, modern calendar with persistent events
          </p>
        </div>

        <CalendarView
          events={events}
          initialView="month"
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          onEventClick={handleEventClick}
        />

        <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400 animate-fadeIn">
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block animate-pulse">💡</span>
            Click on any date to create an event • Click on events to edit them
          </p>
        </div>
      </div>
    </div>
  );
}
