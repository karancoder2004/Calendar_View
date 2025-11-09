import React, { useState } from 'react';
import { CalendarEvent } from './CalendarView.type.js';
import { CalendarCell } from './CalendarCell.js';
import { getWeekDays, isSameDay } from '../../utils/date.utils.js';
import { eventsOnDate } from '../../utils/event.utils.js';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (evt: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDayClick,
  onEventClick
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const weekDays: Date[] = getWeekDays(currentDate);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onDayClick(date);
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {weekDays.map((date: Date, idx: number) => {
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
