// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from './type/calendar.type.js';
import Select from './components/primitives/Select.js';
import { CalendarView } from './components/calendar/CalendarView.js';


export default function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load events from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calendar-events');
    if (saved) setEvents(JSON.parse(saved, (key, value) => (key.includes('Date') ? new Date(value) : value)));
  }, []);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const handleEventClick = useCallback((ev: CalendarEvent) => {
    setSelectedEvent(ev);
    setModalOpen(true);
  }, []);

  const handleEventAdd = useCallback((ev: CalendarEvent) => {
    setEvents(prev => [...prev, ev]);
  }, []);

  const handleEventUpdate = useCallback((id: string, updated: CalendarEvent) => {
    setEvents(prev => prev.map(e => e.id === id ? updated : e));
  }, []);

  const handleEventDelete = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-white">
          Calendar with Persistence Demo
        </h1>

        <div className="flex items-center gap-4 mb-4">
          <Select
            label="View Mode"
            options={[
              { label: 'Month', value: 'month' },
              { label: 'Week', value: 'week' },
            ]}
            value={viewMode}
            onChange={e => setViewMode(e.target.value as 'month' | 'week')}
          />
        </div>

        <CalendarView
          events={events}
          initialView={viewMode}
          onEventAdd={handleEventAdd}
          onEventUpdate={(id, updates) => handleEventUpdate(id, updates as CalendarEvent)}
          onEventDelete={handleEventDelete}
          onEventClick={handleEventClick}
        />
      </div>
    </div>
  );
}
