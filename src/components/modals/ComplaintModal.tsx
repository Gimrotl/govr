import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useModals } from '../../hooks/useModals';

export const ComplaintModal: React.FC = () => {
  const { selectedRide, closeModal } = useModals();
  const [complaintContent, setComplaintContent] = useState('');

  if (!selectedRide) return null;

  const handleSubmitComplaint = () => {
    if (!complaintContent.trim()) {
      alert('Please describe the issue before submitting.');
      return;
    }
    
    // In a real app, this would send the complaint to a backend
    alert(`Complaint about ${selectedRide.driver} submitted: "${complaintContent}"`);
    setComplaintContent('');
    closeModal('complaint');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <AlertTriangle size={20} className="text-red-500 mr-2" />
            Report a Problem with {selectedRide.driver}
          </h2>
          <button
            onClick={() => closeModal('complaint')}
            className="text-gray-500 hover:text-gray-700 transition duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please describe the issue you experienced with this driver or ride. 
            This report will be reviewed by our team.
          </p>
          
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent h-32 resize-none"
            placeholder="Describe the issue in detail..."
            value={complaintContent}
            onChange={(e) => setComplaintContent(e.target.value)}
          ></textarea>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSubmitComplaint}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Submit Report
            </button>
            <button
              onClick={() => closeModal('complaint')}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};