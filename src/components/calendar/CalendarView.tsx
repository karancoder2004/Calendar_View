import React, { useState, lazy, Suspense } from 'react';
import { CalendarViewProps, CalendarEvent } from './CalendarView.type.js';
import { MonthView } from './MonthView.js';
import { WeekView } from './WeekView.js';
import Button from '../primitives/Button.js';
import { format } from 'date-fns';

const EventModal = lazy(() => import('./EventModal.js'));

export const CalendarView: React.FC<CalendarViewProps> = ({
  events: initialEvents = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  onEventClick,
  initialView = 'month',
  initialDate = new Date(),
}) => {
  const [view, setView] = useState<'month' | 'week'>(initialView);
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [modalInitialEvent, setModalInitialEvent] = useState<CalendarEvent | null>(null);

  const prev = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const next = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const today = () => setCurrentDate(new Date());

  const openCreateForDate = (date: Date) => {
    const evt: CalendarEvent = { id: '', title: '', startDate: date, endDate: date, color: '#3b82f6' };
    setModalInitialEvent(evt);
    setEditingEvent(null);
    setModalOpen(true);
  };

  const openEditEvent = (evt: CalendarEvent) => {
    setModalInitialEvent(evt);
    setEditingEvent(evt);
    setModalOpen(true);
    onEventClick?.(evt);
  };

  const handleSave = (evt: CalendarEvent) => {
    if (editingEvent && editingEvent.id) {
      const updates: Partial<CalendarEvent> = evt;
      setEvents(prev => prev.map(e => e.id === evt.id ? evt : e));
      onEventUpdate?.(evt.id, updates);
    } else {
      const newEv = { ...evt, id: evt.id || crypto.randomUUID() };
      setEvents(prev => [...prev, newEv]);
      onEventAdd?.(newEv);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    onEventDelete?.(id);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button
            onClick={prev}
            variant="secondary"
            className="group hover:scale-105 transition-all duration-200 hover:shadow-md"
          >
            <span className="group-hover:-translate-x-1 inline-block transition-transform duration-200">←</span>
            <span className="ml-1">Prev</span>
          </Button>
          <Button
            onClick={today}
            variant="primary"
            className="hover:scale-105 transition-all duration-200 hover:shadow-lg"
          >
            Today
          </Button>
          <Button
            onClick={next}
            variant="secondary"
            className="group hover:scale-105 transition-all duration-200 hover:shadow-md"
          >
            <span className="mr-1">Next</span>
            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
          </Button>
        </div>

        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slideInDown">
          {format(currentDate, 'MMMM yyyy')}
        </h3>

        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-700 rounded-xl">
          <Button
            variant={view === 'month' ? 'primary' : 'secondary'}
            onClick={() => setView('month')}
            className="relative overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">Month</span>
            {view === 'month' && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 animate-slideInFromLeft"></span>
            )}
          </Button>
          <Button
            variant={view === 'week' ? 'primary' : 'secondary'}
            onClick={() => setView('week')}
            className="relative overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">Week</span>
            {view === 'week' && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 animate-slideInFromRight"></span>
            )}
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700 p-4 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-neutral-600 dark:text-neutral-400 py-2 animate-fadeIn"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="animate-fadeIn">
          {view === 'month' ? (
            <MonthView
              currentDate={currentDate}
              events={events}
              onDayClick={openCreateForDate}
              onEventClick={openEditEvent}
            />
          ) : (
            <WeekView
              currentDate={currentDate}
              events={events}
              onDayClick={openCreateForDate}
              onEventClick={openEditEvent}
            />
          )}
        </div>
      </div>

      <Suspense fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      }>
        {modalOpen && (
          <EventModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            onDelete={handleDelete}
            initialEvent={modalInitialEvent}
          />
        )}
      </Suspense>
    </div>
  );
};

export default CalendarView;
