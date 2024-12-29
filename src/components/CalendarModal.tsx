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
  const [animateEvents, setAnimateEvents] = useState(false);

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
        setAnimateEvents(true);
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

  useEffect(() => {
    if (animateEvents) {
      const timer = setTimeout(() => setAnimateEvents(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animateEvents]);

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
      setAnimateEvents(true);
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
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tileClassName = ({ date }: { date: Date }): string => {
    const hasEvent = events.some(
      event => new Date(event.date).toDateString() === date.toDateString()
    );
    return hasEvent ? 'event-date' : '';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  School Calendar
                </motion.h2>
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"
                  />
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-4">{error}</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate}
                      className="calendar-custom"
                      tileClassName={tileClassName}
                    />
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-gray-500 mt-4 text-center"
                    >
                      Last updated: {formatLastUpdated(lastUpdated)}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {formatDate(selectedDate)}
                    </h3>
                    
                    <AnimatePresence mode="wait">
                      {selectedEvents.length > 0 ? (
                        <motion.div
                          key="events"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {selectedEvents.map((event, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: index * 0.1 }
                              }}
                              className="bg-white rounded-lg p-4 shadow-sm mb-3 border border-gray-100"
                            >
                              <h4 className="font-semibold text-gray-900">{event.title}</h4>
                              {event.description && (
                                <p className="text-gray-600 mt-2">{event.description}</p>
                              )}
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="no-events"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-gray-500 text-center py-8"
                        >
                          No events scheduled for this date
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendarModal;
