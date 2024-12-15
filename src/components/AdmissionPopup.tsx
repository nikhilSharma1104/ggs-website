import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface AdmissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdmissionPopup: React.FC<AdmissionPopupProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleAdmissionClick = () => {
    onClose();
    navigate('/admissions');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="p-6 bg-white rounded-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-comic font-bold text-primary-600 mb-4">
              Join Our School Family!
            </h2>
            <p className="text-gray-600 mb-6 font-comic">
              Admissions for the new academic year are now open. Secure your child's future with quality education at Gurukulam Global School.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleAdmissionClick}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-comic hover:bg-primary-700 transition-colors"
              >
                Start Admission Process
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-comic hover:bg-gray-200 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdmissionPopup;
