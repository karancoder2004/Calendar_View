import { useState, useCallback } from 'react';

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const goToNextMonth = useCallback(() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)), []);
  const goToPreviousMonth = useCallback(() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)), []);
  const goToToday = useCallback(() => setCurrentDate(new Date()), []);

  return { currentDate, setCurrentDate, goToNextMonth, goToPreviousMonth, goToToday };
};
