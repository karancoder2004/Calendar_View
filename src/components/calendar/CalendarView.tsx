import React, { useState } from 'react';
import type { CalendarViewProps } from './CalendarView.type.ts';
import { CalendarCell } from './CalendarCell.js';

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  onEventClick,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const days: Date[] = [];
  for (let d = startOfMonth.getDate(); d <= endOfMonth.getDate(); d++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), d));
  }

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
      {days.map((day) => {
        const dayEvents = events.filter(
          (event) => event.date.toDateString() === day.toDateString()
        );
        const isToday = day.toDateString() === new Date().toDateString();
        const isSelected = selectedDate?.toDateString() === day.toDateString();

        return (
          <CalendarCell
            key={day.toDateString()}
            date={day}
            events={dayEvents}
            isToday={isToday}
            isSelected={isSelected}
            onSelectDate={handleSelectDate}
            onEventClick={onEventClick}
          />
        );
      })}
    </div>
  );
};
