import React, { useState, useMemo, lazy, Suspense } from 'react';
import { CalendarViewProps, CalendarEvent } from './CalendarView.type';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView'; // Optional
import Button from '../primitives/Button';
import { format } from 'date-fns';
import { getCalendarGrid } from '@/utils/date.utils';

const EventModal = lazy(() => import('./EventModal'));

export const CalendarView: React.FC<CalendarViewProps> = ({
  events: initialEvents = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
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
  };

  const handleSave = (evt: CalendarEvent) => {
    if (editingEvent && editingEvent.id) {
      setEvents(prev => prev.map(e => e.id === evt.id ? evt : e));
      onEventUpdate?.(evt.id, evt);
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button onClick={prev} variant="secondary">Prev</Button>
          <Button onClick={today} variant="secondary">Today</Button>
          <Button onClick={next} variant="secondary">Next</Button>
        </div>

        <h3 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h3>

        <div className="flex items-center gap-2">
          <Button variant={view === 'month' ? 'primary' : 'secondary'} onClick={() => setView('month')}>Month</Button>
          <Button variant={view === 'week' ? 'primary' : 'secondary'} onClick={() => setView('week')}>Week</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-2">
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

      <Suspense fallback={<div>Loading...</div>}>
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