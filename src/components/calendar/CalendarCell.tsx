import React, { memo } from 'react';
import type { CalendarCellProps, CalendarEvent } from './CalendarView.type.ts';

export const CalendarCell: React.FC<CalendarCellProps> = memo(
  ({ date, events, isToday, isSelected, onSelectDate, onEventClick }) => {
    const handleClickDate = () => {
      onSelectDate(date);
    };

    const handleClickEvent = (event: CalendarEvent, e: React.MouseEvent) => {
      e.stopPropagation();
      onEventClick(event);
    };

    return (
      <div
        style={{
          border: isSelected ? '2px solid blue' : '1px solid gray',
          padding: '8px',
          backgroundColor: isToday ? '#f0f8ff' : 'white',
          minHeight: '80px',
          position: 'relative',
        }}
        onClick={handleClickDate}
      >
        <span style={{ fontWeight: isToday ? 'bold' : 'normal' }}>
          {date.getDate()}
        </span>

        <div style={{ marginTop: '4px' }}>
          {events.map((event) => (
            <button
              key={event.id}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '2px',
                backgroundColor: '#ffeb3b',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={(e) => handleClickEvent(event, e)}
            >
              {event.title}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
