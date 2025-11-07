import React, { useMemo } from 'react';
import { CalendarEvent } from './CalendarView.type';
import { CalendarCell } from './CalendarCell';
import { getCalendarGrid, isSameDay } from '@/utils/date.utils';
import { eventsOnDate } from '@/utils/event.utils';

interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (evt: CalendarEvent) => void;
}

export const MonthView: React.FC<Props> = React.memo(({ currentDate, events, onDayClick, onEventClick }) => {
  const grid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);

  return (
    <div className="grid grid-cols-7 gap-px bg-neutral-200">
      {grid.map((date, idx) => {
        const dayEvents = eventsOnDate(events, date);
        const isToday = isSameDay(date, new Date());

        return (
          <CalendarCell
            key={idx}
            date={date}
            events={dayEvents}
            isToday={isToday}
            isSelected={false}
            onSelectDate={onDayClick}
            onEventClick={onEventClick}
          />
        );
      })}
    </div>
  );
});
