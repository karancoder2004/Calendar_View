// src/components/calendar/EventModal.tsx
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialEvent ? 'Edit Event' : 'Add Event'}>
      <div className="space-y-3">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Start *</label>
            <input
              type="datetime-local"
              className="w-full border rounded px-3 py-2"
              value={start}
              onChange={e => setStart(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End *</label>
            <input
              type="datetime-local"
              className="w-full border rounded px-3 py-2"
              value={end}
              onChange={e => setEnd(e.target.value)}
            />
          </div>
        </div>

        <Select options={colorOptions} value={color} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setColor(e.target.value)} label="Color" />

        <div className="flex justify-end gap-2 mt-2">
          {initialEvent && onDelete && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
