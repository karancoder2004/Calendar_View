// src/App.tsx
import React, { useState, lazy, Suspense, useCallback } from 'react';
import { CalendarEvent } from './components/calendar/CalendarView.type';
import Select from './components/primitives/Select';
import CalendarView from './components/calendar/CalendarView';


// Lazy load the modal for optimization
const Modal = lazy(() => import('./components/primitives/Modal'));

const demoEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 30 * 60000),
    color: '#3b82f6',
  },
  {
    id: '2',
    title: 'Client Call',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2, 11, 0),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2, 12, 0),
    color: '#10b981',
  },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleAddEvent = useCallback((event: CalendarEvent) => {
    console.log('Event Added:', event);
  }, []);

  const handleUpdateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    console.log('Event Updated:', id, updates);
  }, []);

  const handleDeleteEvent = useCallback((id: string) => {
    console.log('Event Deleted:', id);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-white">
          Calendar Assignment Demo
        </h1>

        <div className="flex items-center gap-4 mb-4">
          <Select
            label="View Mode"
            options={[
              { label: 'Month', value: 'month' },
              { label: 'Week', value: 'week' },
            ]}
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'month' | 'week')}
          />
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Add Event
          </button>
        </div>

        <CalendarView
          events={demoEvents}
          initialView={viewMode}
          onEventAdd={handleAddEvent}
          onEventUpdate={handleUpdateEvent}
          onEventDelete={handleDeleteEvent}
          onEventClick={handleEventClick}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedEvent ? selectedEvent.title : 'New Event'}
          >
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {selectedEvent
                ? `Starts: ${selectedEvent.startDate.toLocaleString()}`
                : 'Fill in event details here.'}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 dark:bg-neutral-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-neutral-600 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </button>
            </div>
          </Modal>
        </Suspense>
      </div>
    </div>
  );
}
