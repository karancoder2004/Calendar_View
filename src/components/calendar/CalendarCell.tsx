import React, { useCallback, useMemo } from 'react';
import { CalendarEvent } from './CalendarView.type';
import clsx from 'clsx';

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isSelected: boolean;
  onSelectDate: (date: Date) => void;
  onEventClick: (evt: CalendarEvent) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = React.memo(
  ({ date, events, isToday, isSelected, onSelectDate, onEventClick }) => {
    const dayNumber = date.getDate();

    const handleClick = useCallback(() => {
      onSelectDate(date);
    }, [date, onSelectDate]);

    const eventCount = useMemo(() => events.length, [events]);

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`${date.toDateString()}. ${eventCount} events.`}
        aria-pressed={isSelected}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
        className={clsx(
          "border border-neutral-200 h-32 p-2 hover:bg-neutral-50 transition-colors cursor-pointer",
          isSelected && "bg-primary-100"
        )}
      >
        <div className="flex justify-between items-start mb-1">
          <span className={clsx("text-sm font-medium", isToday ? 'text-primary-600' : 'text-neutral-900')}>
            {dayNumber}
          </span>
          {isToday && (
            <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
              {dayNumber}
            </span>
          )}
        </div>

        <div className="space-y-1 overflow-hidden">
          {events.slice(0, 3).map(ev => (
            <div
              key={ev.id}
              className="text-xs px-2 py-1 rounded truncate cursor-pointer"
              style={{ backgroundColor: ev.color }}
              onClick={(e) => { e.stopPropagation(); onEventClick(ev); }}
              title={ev.description}
            >
              {ev.title}
            </div>
          ))}
          {events.length > 3 && (
            <button className="text-xs text-primary-600 hover:underline" onClick={(e) => e.stopPropagation()}>
              +{events.length - 3} more
            </button>
          )}
        </div>
      </div>
    );
  }
);
