export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  category?: string;
}

export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isSelected: boolean;
  onSelectDate: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export interface CalendarViewProps {
  events: CalendarEvent[];
  initialView?: 'month' | 'week';
  onEventAdd: (event: CalendarEvent) => void;
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}
