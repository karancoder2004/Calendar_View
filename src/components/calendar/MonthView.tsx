import React, { useState } from 'react';
import { CalendarEvent } from './CalendarView.type';
import { CalendarCell } from './CalendarCell';
import { getCalendarGrid, isSameDay } from '@/utils/date.utils';
import { eventsOnDate } from '@/utils/event.utils';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (evt: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({ currentDate, events, onDayClick, onEventClick }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const grid = getCalendarGrid(currentDate);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onDayClick(date);
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-neutral-200">
      {grid.map((date, idx) => {
        const dayEvents = eventsOnDate(events, date);
        const isToday = isSameDay(date, new Date());
        const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

        return (
          <CalendarCell
            key={idx}
            date={date}
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
