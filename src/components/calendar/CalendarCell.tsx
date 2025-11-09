import React, { useCallback, useMemo } from 'react';
import { CalendarEvent } from './CalendarView.type.js';
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
          "relative group border border-neutral-200 dark:border-neutral-700 rounded-xl h-32 p-3 cursor-pointer",
          "transition-all duration-300 ease-out",
          "hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20",
          "hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5",
          "hover:border-blue-300 dark:hover:border-blue-600",
          "bg-white dark:bg-neutral-800",
          isSelected && "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 shadow-md border-blue-400 scale-[1.01]",
          isToday && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-neutral-900"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            {isToday ? (
              <div className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse"></span>
                <span className="relative flex items-center justify-center w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-sm font-bold shadow-lg animate-scaleIn">
                  {dayNumber}
                </span>
              </div>
            ) : (
              <span className={clsx(
                "text-sm font-semibold transition-colors duration-200",
                "text-neutral-700 dark:text-neutral-300",
                "group-hover:text-blue-600 dark:group-hover:text-blue-400"
              )}>
                {dayNumber}
              </span>
            )}

            {eventCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-sm animate-scaleIn">
                {eventCount}
              </span>
            )}
          </div>

          <div className="space-y-1.5 overflow-hidden">
            {events.slice(0, 3).map((ev, idx) => (
              <div
                key={ev.id}
                className="group/event relative text-xs px-2 py-1 rounded-lg truncate cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md animate-slideInFromLeft"
                style={{
                  backgroundColor: ev.color,
                  animationDelay: `${idx * 50}ms`
                }}
                onClick={(e) => { e.stopPropagation(); onEventClick(ev); }}
                title={ev.description}
              >
                <span className="relative z-10 text-white font-medium drop-shadow-sm">{ev.title}</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/event:opacity-100 transition-opacity duration-200 rounded-lg"></div>
              </div>
            ))}
            {events.length > 3 && (
              <button
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center gap-1 group/more"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="group-hover/more:translate-x-0.5 transition-transform duration-200">+{events.length - 3} more</span>
                <span className="opacity-0 group-hover/more:opacity-100 transition-opacity duration-200">→</span>
              </button>
            )}
          </div>
        </div>

        {(isSelected || isToday) && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl animate-slideInFromBottom"></div>
        )}
      </div>
    );
  }
);
