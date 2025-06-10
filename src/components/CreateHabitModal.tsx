
import React, { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateHabitModal: React.FC<CreateHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useHabits();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'default',
    color: '#3B82F6',
    frequency: 'daily' as const
  });

  const iconOptions = [
    { value: 'water', label: '💧', name: 'Water' },
    { value: 'exercise', label: '🏃‍♂️', name: 'Exercise' },
    { value: 'book', label: '📚', name: 'Reading' },
    { value: 'meditation', label: '🧘‍♀️', name: 'Meditation' },
    { value: 'sleep', label: '😴', name: 'Sleep' },
    { value: 'food', label: '🥗', name: 'Healthy Eating' },
    { value: 'work', label: '💼', name: 'Work' },
    { value: 'music', label: '🎵', name: 'Music' },
    { value: 'art', label: '🎨', name: 'Art' },
    { value: 'code', label: '💻', name: 'Coding' },
    { value: 'default', label: '⭐', name: 'Other' }
  ];

  const colorOptions = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6B7280'  // Gray
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addHabit(formData);
    setFormData({
      name: '',
      description: '',
      icon: 'default',
      color: '#3B82F6',
      frequency: 'daily'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Habit</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Habit Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Drink 8 glasses of water"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Why is this habit important to you?"
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Choose an Icon
            </Label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: icon.value })}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200 ${
                    formData.icon === icon.value
                      ? 'bg-blue-100 ring-2 ring-blue-500 scale-110'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  title={icon.name}
                >
                  {icon.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Choose a Color
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-12 h-12 rounded-xl transition-all duration-200 ${
                    formData.color === color
                      ? 'ring-2 ring-gray-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              Create Habit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHabitModal;
