import React, { useEffect, useState } from 'react';
import { Modal } from '../primitives/Modal';
import Button from '../primitives/Button';
import Select from '../primitives/Select';
import { CalendarEvent } from './CalendarView.type';

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

const categoryOptions = [
  { label: 'None', value: '' },
  { label: 'Meeting', value: 'Meeting' },
  { label: 'Work', value: 'Work' },
  { label: 'Design', value: 'Design' },
];

export const EventModal: React.FC<Props> = ({ isOpen, onClose, onSave, onDelete, initialEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [color, setColor] = useState(colorOptions[0].value);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || '');
      setDescription(initialEvent.description || '');
      setStart(initialEvent.startDate ? initialEvent.startDate.toISOString().slice(0,16) : '');
      setEnd(initialEvent.endDate ? initialEvent.endDate.toISOString().slice(0,16) : '');
      setColor(initialEvent.color || colorOptions[0].value);
      setCategory(initialEvent.category || '');
    } else {
      setTitle('');
      setDescription('');
      setStart('');
      setEnd('');
      setColor(colorOptions[0].value);
      setCategory('');
    }
  }, [initialEvent, isOpen]);

  const validate = () => {
    if (!title.trim()) return 'Title is required';
    if (!start || !end) return 'Start and end are required';
    if (new Date(end).getTime() <= new Date(start).getTime()) return 'End must be after start';
    return null;
  };

  const handleSave = () => {
    const err = validate();
    if (err) { alert(err); return; }
    const ev: CalendarEvent = {
      id: initialEvent?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      startDate: new Date(start),
      endDate: new Date(end),
      color,
      category: category || undefined,
    };
    onSave(ev);
  };

  const handleDelete = () => {
    if (initialEvent?.id && onDelete) {
      onDelete(initialEvent.id);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialEvent ? 'Edit Event' : 'Add Event'}>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input className="w-full border rounded px-3 py-2" maxLength={100} value={title} onChange={e=>setTitle(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea className="w-full border rounded px-3 py-2" maxLength={500} value={description} onChange={e=>setDescription(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Start *</label>
            <input type="datetime-local" className="w-full border rounded px-3 py-2" value={start} onChange={e=>setStart(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End *</label>
            <input type="datetime-local" className="w-full border rounded px-3 py-2" value={end} onChange={e=>setEnd(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select options={colorOptions} value={color} onChange={e=>setColor(e.target.value)} label="Color" />
          <Select options={categoryOptions} value={category} onChange={e=>setCategory(e.target.value)} label="Category" />
        </div>

        <div className="flex justify-end gap-2 mt-2">
          {initialEvent && onDelete && <Button variant="danger" onClick={handleDelete}>Delete</Button>}
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};
