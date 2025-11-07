import { CalendarEvent } from '@/components/calendar/CalendarView.type';

// Return events that overlap the given date (day-precision)
export const eventsOnDate = (events: CalendarEvent[], date: Date) =>
  events.filter(e => {
    const startDay = new Date(e.startDate.getFullYear(), e.startDate.getMonth(), e.startDate.getDate()).getTime();
    const endDay = new Date(e.endDate.getFullYear(), e.endDate.getMonth(), e.endDate.getDate()).getTime();
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return target >= startDay && target <= endDay;
  });
