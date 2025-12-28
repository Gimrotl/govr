import React from 'react';
import { X, Clock, User, AlertTriangle } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { CarTypeIcon } from '../CarTypeIcon';

export const ReportDetailsModal: React.FC = () => {
  const { activeModals, selectedReport, closeModal } = useModals();

  if (!activeModals.reportDetails || !selectedReport) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Meldungsdetails</h2>
          <button
            onClick={() => closeModal('reportDetails')}
            className="text-gray-600 hover:text-gray-800 p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 md:p-5">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                    {selectedReport.type}
                  </h3>
                  <span className={`inline-flex mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedReport.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedReport.status === 'pending' ? 'Ausstehend' : 'Gelöst'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <User className="text-sky-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Benutzer</p>
                  <p className="font-medium text-gray-900">{selectedReport.user}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CarTypeIcon className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Fahrt</p>
                  <p className="font-medium text-gray-900">{selectedReport.ride}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 md:p-5">
              <p className="text-sm text-gray-600 mb-2">Beschreibung</p>
              <p className="text-gray-900 leading-relaxed">
                {selectedReport.description || 'Keine zusätzlichen Details verfügbar.'}
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => closeModal('reportDetails')}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition"
              >
                Schließen
              </button>
              {selectedReport.status === 'pending' && (
                <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">
                  Als Gelöst markieren
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
