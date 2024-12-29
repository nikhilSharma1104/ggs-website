import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import type { Value } from 'react-calendar/dist/cjs/shared/types';
import { fetchEventsFromSheet, SheetEvent } from '../services/googleSheets';
import 'react-calendar/dist/Calendar.css';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Event {
  date: Date;
  title: string;
  description?: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const sheetEvents = await fetchEventsFromSheet();
        
        // Convert sheet events to our Event format
        const events = sheetEvents.map(event => ({
          date: new Date(event.date),
          title: event.title,
          description: event.description
        }));

        setAllEvents(events);
        setError(null);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadEvents();
    }
  }, [isOpen]);

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      const events = allEvents.filter(
        event => event.date.toDateString() === value.toDateString()
      );
      setSelectedEvents(events);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary-900">School Calendar</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-primary-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="w-full rounded-lg shadow-lg"
                tileClassName={({ date }) => {
                  return allEvents.some(event => 
                    event.date.toDateString() === date.toDateString()
                  ) ? 'bg-secondary-100 text-secondary-900 font-bold' : '';
                }}
              />
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Events on {selectedDate.toLocaleDateString()}
              </h3>
              {selectedEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedEvents.map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-lg font-semibold text-primary-900">{event.title}</h4>
                      {event.description && (
                        <p className="text-gray-600 mt-2">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No events scheduled for this date.</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          * Dates with events are highlighted. Click on a date to view event details.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarModal;
