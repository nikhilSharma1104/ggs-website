import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import type { Value } from 'react-calendar/dist/cjs/shared/types';
import { fetchEventsFromSheet } from '../services/googleSheets';
import 'react-calendar/dist/Calendar.css';
import './CalendarModal.css';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Event {
  date: string;
  title: string;
  description?: string;
}

const REFRESH_INTERVAL = 60000; // Refresh every minute

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadEvents = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      
      const fetchedEvents = await fetchEventsFromSheet();
      setEvents(fetchedEvents);
      setLastUpdated(new Date());

      // Update selected events if a date is already selected
      if (selectedDate) {
        const dateEvents = fetchedEvents.filter(
          event => new Date(event.date).toDateString() === selectedDate.toDateString()
        );
        setSelectedEvents(dateEvents);
      }
    } catch (err: any) {
      console.error('Error loading events:', err);
      setError(err.message || 'Failed to load events');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, [selectedDate]);

  // Initial load and periodic refresh
  useEffect(() => {
    if (isOpen) {
      loadEvents();

      // Set up periodic refresh
      const refreshInterval = setInterval(() => {
        loadEvents(false); // Don't show loading state for background refreshes
      }, REFRESH_INTERVAL);

      // Clean up interval when modal closes
      return () => clearInterval(refreshInterval);
    }
  }, [isOpen, loadEvents]);

  // Set up visibility change detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isOpen) {
        loadEvents(false); // Refresh data when tab becomes visible
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isOpen, loadEvents]);

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      const dateEvents = events.filter(
        event => new Date(event.date).toDateString() === value.toDateString()
      );
      setSelectedEvents(dateEvents);
      setShowEventDetails(dateEvents.length > 0);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLastUpdated = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={() => {
        setShowEventDetails(false);
        onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg bg-white rounded-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading calendar...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  loadEvents();
                }}
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
              <span className="text-xs text-gray-500">
                Updated: {formatLastUpdated(lastUpdated)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  loadEvents(true);
                }}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                title="Refresh events"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEventDetails(false);
                  onClose();
                }}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="w-full rounded-lg shadow-sm calendar-custom"
                tileClassName={({ date }) => {
                  return events.some(
                    event => new Date(event.date).toDateString() === date.toDateString()
                  ) ? 'event-date' : '';
                }}
              />
            </div>

            <AnimatePresence>
              {showEventDetails && selectedEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="border-t border-gray-200 bg-gray-50"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Events on {formatDate(selectedDate)}
                    </h3>
                    <div className="space-y-4">
                      {selectedEvents.map((event, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                        >
                          <h4 className="font-semibold text-green-800">{event.title}</h4>
                          {event.description && (
                            <p className="mt-2 text-gray-600">{event.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CalendarModal;
