import React, { useState, useEffect } from 'react';
import { CalendarEvent } from './CalendarView.type.js';
import Modal from '../primitives/Modal.js';
import Button from '../primitives/Button.js';
import Select from '../primitives/Select.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ev: CalendarEvent) => void;
  onDelete?: (id: string) => void;
  initialEvent?: CalendarEvent | null;
}

const colorOptions = [
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Green', value: '#10b981' },
  { label: 'Orange', value: '#f59e0b' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Purple', value: '#8b5cf6' },
];

export const EventModal: React.FC<Props> = ({ isOpen, onClose, onSave, onDelete, initialEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [color, setColor] = useState(colorOptions[0].value);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || '');
      setDescription(initialEvent.description || '');
      setStart(initialEvent.startDate?.toISOString().slice(0, 16) || '');
      setEnd(initialEvent.endDate?.toISOString().slice(0, 16) || '');
      setColor(initialEvent.color || colorOptions[0].value);
    } else {
      setTitle('');
      setDescription('');
      setStart('');
      setEnd('');
      setColor(colorOptions[0].value);
    }
    setError('');
  }, [initialEvent, isOpen]);

  const validate = (): boolean => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!start || !end) {
      setError('Start and end date are required');
      return false;
    }
    if (new Date(end).getTime() <= new Date(start).getTime()) {
      setError('End must be after start');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;

    const ev: CalendarEvent = {
      id: initialEvent?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      startDate: new Date(start),
      endDate: new Date(end),
      color,
    };
    onSave(ev);
    onClose();
  };

  const handleDelete = () => {
    if (initialEvent?.id && onDelete) {
      onDelete(initialEvent.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialEvent?.id ? 'Edit Event' : 'Create New Event'}>
      <div className="space-y-4 animate-fadeIn">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 animate-shake">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              {error}
            </p>
          </div>
        )}

        <div className="space-y-2 animate-slideInFromLeft" style={{ animationDelay: '50ms' }}>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2.5
                     bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                     focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20
                     transition-all duration-200 outline-none placeholder:text-neutral-400"
            placeholder="Enter event title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2 animate-slideInFromLeft" style={{ animationDelay: '100ms' }}>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Description
          </label>
          <textarea
            className="w-full border-2 border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2.5
                     bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                     focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20
                     transition-all duration-200 outline-none placeholder:text-neutral-400 min-h-[80px] resize-none"
            placeholder="Add event description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 animate-slideInFromLeft" style={{ animationDelay: '150ms' }}>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              className="w-full border-2 border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2.5
                       bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                       focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20
                       transition-all duration-200 outline-none"
              value={start}
              onChange={e => setStart(e.target.value)}
            />
          </div>
          <div className="space-y-2 animate-slideInFromLeft" style={{ animationDelay: '200ms' }}>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              className="w-full border-2 border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2.5
                       bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white
                       focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20
                       transition-all duration-200 outline-none"
              value={end}
              onChange={e => setEnd(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 animate-slideInFromLeft" style={{ animationDelay: '250ms' }}>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
            Event Color
          </label>
          <div className="flex gap-3 flex-wrap">
            {colorOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setColor(opt.value)}
                className={`group relative w-12 h-12 rounded-xl transition-all duration-200 hover:scale-110 ${
                  color === opt.value ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 scale-105' : 'hover:shadow-lg'
                }`}
                style={{
                  backgroundColor: opt.value,
                  ...(color === opt.value && { '--tw-ring-color': opt.value } as any)
                }}
                title={opt.label}
              >
                {color === opt.value && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold animate-scaleIn">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700 animate-slideInFromBottom">
          {initialEvent?.id && onDelete ? (
            <Button
              variant="danger"
              onClick={handleDelete}
              className="hover:scale-105 transition-transform duration-200"
            >
              🗑️ Delete
            </Button>
          ) : <div></div>}

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={onClose}
              className="hover:scale-105 transition-transform duration-200"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
            >
              {initialEvent?.id ? '💾 Update' : '✨ Create'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
