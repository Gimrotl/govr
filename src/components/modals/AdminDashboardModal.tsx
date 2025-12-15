import React, { useState } from 'react';
import { X, Users, Car, AlertTriangle, Settings, LogOut, Shield, Eye, Trash2, Ban, CheckCircle, FileText, Save } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useAuth } from '../../hooks/useAuth';
import { useRides } from '../../hooks/useRides';
import { useInfoCards, InfoCard } from '../../hooks/useInfoCards';
import { UserProfile } from '../../types';

export const AdminDashboardModal: React.FC = () => {
  const { closeModal, openUserProfile, openReportDetails } = useModals();
  const { logout } = useAuth();
  const { rides } = useRides();
  const { cards, updateCard, loading: cardsLoading } = useInfoCards();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'rides' | 'reports' | 'settings' | 'content'>('dashboard');
  const [showSidebar, setShowSidebar] = useState(false);
  const [editingCard, setEditingCard] = useState<InfoCard | null>(null);
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    logout();
    closeModal('adminDashboard');
  };

  const handleViewUser = (user: any) => {
    const userProfile: UserProfile = {
      firstName: user.name,
      age: '30',
      mobile: '',
      whatsapp: '',
      telegram: '',
      carImages: []
    };
    openUserProfile(userProfile);
  };

  const mockUsers = [
    { id: 1, name: 'Anna', email: 'anna@example.com', status: 'active', rides: 5, ipAddress: '192.168.1.1' },
    { id: 2, name: 'Tom', email: 'tom@example.com', status: 'active', rides: 3, ipAddress: '192.168.1.2' },
    { id: 3, name: 'Lisa', email: 'lisa@example.com', status: 'suspended', rides: 2, ipAddress: '192.168.1.3' },
    { id: 4, name: 'Mark', email: 'mark@example.com', status: 'active', rides: 8, ipAddress: '192.168.1.4' }
  ];

  const mockReports = [
    { id: 1, type: 'Inappropriate behavior', user: 'John Doe', ride: 'Berlin → München', status: 'pending' },
    { id: 2, type: 'No-show driver', user: 'Jane Smith', ride: 'Hamburg → Köln', status: 'resolved' },
    { id: 3, type: 'Overcharging', user: 'Mike Johnson', ride: 'Frankfurt → Stuttgart', status: 'pending' }
  ];

  const renderDashboard = () => (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 md:block hidden">Willkommen, Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users size={24} className="text-sky-500 mr-3 md:mr-4 md:w-8 md:h-8" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Benutzer</h3>
              <p className="text-sm md:text-base text-gray-600 hidden md:block">Registrierte Benutzer, Rollen und Zugriffsrechte verwalten.</p>
              <p className="text-xl md:text-2xl font-bold text-sky-500 mt-1 md:mt-2">{mockUsers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Car size={24} className="text-emerald-500 mr-3 md:mr-4 md:w-8 md:h-8" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Fahrten</h3>
              <p className="text-sm md:text-base text-gray-600 hidden md:block">Fahrten überprüfen und genehmigen, aktive Angebote prüfen.</p>
              <p className="text-xl md:text-2xl font-bold text-emerald-500 mt-1 md:mt-2">{rides.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <AlertTriangle size={24} className="text-red-600 mr-3 md:mr-4 md:w-8 md:h-8" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Meldungen</h3>
              <p className="text-sm md:text-base text-gray-600 hidden md:block">Gemeldete Fahrten oder verdächtige Konten bearbeiten.</p>
              <p className="text-xl md:text-2xl font-bold text-red-600 mt-1 md:mt-2">{mockReports.filter(r => r.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Settings size={24} className="text-gray-600 mr-3 md:mr-4 md:w-8 md:h-8" />
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Einstellungen</h3>
              <p className="text-sm md:text-base text-gray-600 hidden md:block">Website-Einstellungen und Admin-Tools konfigurieren.</p>
              <p className="text-xl md:text-2xl font-bold text-gray-600 mt-1 md:mt-2">✓</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 hidden md:block">Benutzerverwaltung</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {mockUsers.map((user) => (
            <div key={user.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{user.email}</div>
                  <div className="text-xs text-gray-600 font-mono mt-1">{user.ipAddress}</div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.status === 'active' ? 'Aktiv' : 'Gesperrt'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{user.rides} Fahrten</span>
                <div className="flex space-x-2">
                  <button onClick={() => handleViewUser(user)} className="text-sky-500 hover:text-sky-700 p-1">
                    <Eye size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1">
                    <Ban size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="w-full hidden md:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benutzer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP-Adresse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fahrten</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600 font-mono">{user.ipAddress}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? 'Aktiv' : 'Gesperrt'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.rides}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => handleViewUser(user)} className="text-sky-500 hover:text-sky-700">
                    <Eye size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Ban size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRides = () => (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 hidden md:block">Fahrtenverwaltung</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {rides.slice(0, 10).map((ride) => (
            <div key={ride.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{ride.from} → {ride.to}</div>
                  <div className="text-sm text-gray-500 mt-1">{ride.driver}</div>
                  <div className="text-xs text-gray-600 font-mono mt-1">{ride.ipAddress || 'Keine IP'}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{ride.price}</div>
                  <div className="text-sm text-gray-500">{ride.date}</div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button className="text-sky-500 hover:text-sky-700 p-1">
                  <Eye size={16} />
                </button>
                <button className="text-green-600 hover:text-green-900 p-1">
                  <CheckCircle size={16} />
                </button>
                <button className="text-red-600 hover:text-red-900 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="w-full hidden md:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fahrer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP-Adresse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rides.slice(0, 10).map((ride) => (
              <tr key={ride.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{ride.from} → {ride.to}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{ride.driver}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600 font-mono">{ride.ipAddress || 'Keine IP'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{ride.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{ride.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-sky-500 hover:text-sky-700">
                    <Eye size={16} />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <CheckCircle size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 hidden md:block">Meldungen</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {mockReports.map((report) => (
            <div key={report.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium text-gray-900">{report.type}</div>
                  <div className="text-sm text-gray-500">{report.user}</div>
                  <div className="text-sm text-gray-500">{report.ride}</div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  report.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {report.status === 'pending' ? 'Ausstehend' : 'Gelöst'}
                </span>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => openReportDetails(report)} className="text-sky-500 hover:text-sky-700 p-1">
                  <Eye size={16} />
                </button>
                <button className="text-green-600 hover:text-green-900 p-1">
                  <CheckCircle size={16} />
                </button>
                <button className="text-red-600 hover:text-red-900 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="w-full hidden md:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benutzer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fahrt</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockReports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{report.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{report.user}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{report.ride}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    report.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {report.status === 'pending' ? 'Ausstehend' : 'Gelöst'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => openReportDetails(report)} className="text-sky-500 hover:text-sky-700">
                    <Eye size={16} />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <CheckCircle size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 hidden md:block">Einstellungen</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Plattform-Einstellungen</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base text-gray-700">Neue Registrierungen</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base text-gray-700">Automatische Genehmigung</span>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base text-gray-700">E-Mail-Benachrichtigungen</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Sicherheit</h3>
          <div className="space-y-4">
            <button className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition duration-200">
              Passwort ändern
            </button>
            <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
              Backup erstellen
            </button>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200">
              Logs anzeigen
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleSaveCard = async () => {
    if (!editingCard) return;
    setSaving(true);
    await updateCard(editingCard.id, {
      title: editingCard.title,
      description: editingCard.description,
      link_text: editingCard.link_text
    });
    setSaving(false);
    setEditingCard(null);
  };

  const renderContentCards = () => (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 hidden md:block">Info-Karten verwalten</h1>

      {cardsLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              {editingCard?.id === card.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                    <input
                      type="text"
                      value={editingCard.title}
                      onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                    <textarea
                      value={editingCard.description}
                      onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link-Text</label>
                    <input
                      type="text"
                      value={editingCard.link_text}
                      onChange={(e) => setEditingCard({ ...editingCard, link_text: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveCard}
                      disabled={saving}
                      className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
                    >
                      <Save size={16} />
                      {saving ? 'Speichern...' : 'Speichern'}
                    </button>
                    <button
                      onClick={() => setEditingCard(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{card.description}</p>
                    <p className="text-red-500 text-sm font-medium">{card.link_text}</p>
                  </div>
                  <button
                    onClick={() => setEditingCard(card)}
                    className="ml-4 text-sky-500 hover:text-sky-700 p-2 hover:bg-sky-50 rounded-lg transition"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMainContent = () => {
    switch (activeTab) {
      case 'users':
        return renderUsers();
      case 'rides':
        return renderRides();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      case 'content':
        return renderContentCards();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-100 rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col md:flex-row animate-scaleIn">
        {/* Mobile Header */}
        <div className="md:hidden bg-gray-800 text-white p-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center">
            <Shield size={20} className="text-sky-300 mr-2" />
            <h2 className="text-lg font-bold">Admin Panel</h2>
          </div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Tabs */}
        {showSidebar && (
          <div className="md:hidden bg-gray-700 text-white p-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setShowSidebar(false);
              }}
              className={`w-full text-left p-3 rounded-lg transition duration-200 flex items-center ${
                activeTab === 'dashboard' ? 'bg-gray-600' : 'hover:bg-gray-600'
              }`}
            >
              <Settings size={18} className="mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('users');
                setShowSidebar(false);
              }}
              className={`w-full text-left p-3 rounded-lg transition duration-200 flex items-center ${
                activeTab === 'users' ? 'bg-gray-600' : 'hover:bg-gray-600'
              }`}
            >
              <Users size={18} className="mr-3" />
              Benutzer
            </button>
            <button
              onClick={() => {
                setActiveTab('rides');
                setShowSidebar(false);
              }}
              className={`w-full text-left p-3 rounded-lg transition duration-200 flex items-center ${
                activeTab === 'rides' ? 'bg-gray-600' : 'hover:bg-gray-600'
              }`}
            >
              <Car size={18} className="mr-3" />
              Fahrten
            </button>
            <button
              onClick={() => {
                setActiveTab('reports');
                setShowSidebar(false);
              }}
              className={`w-full text-left p-3 rounded-lg transition duration-200 flex items-center ${
                activeTab === 'reports' ? 'bg-gray-600' : 'hover:bg-gray-600'
              }`}
            >
              <AlertTriangle size={18} className="mr-3" />
              Meldungen
            </button>
            <button
              onClick={() => {
                setActiveTab('content');
                setShowSidebar(false);
              }}
              className={`w-full text-left p-3 rounded-lg transition duration-200 flex items-center ${
                activeTab === 'content' ? 'bg-gray-600' : 'hover:bg-gray-600'
              }`}
            >
              <FileText size={18} className="mr-3" />
              Inhalte
            </button>
            <button
              onClick={() => {
                setActiveTab('settings');
                setShowSidebar(false);
              }}
              className={`w-full text-left p-3 rounded-lg transition duration-200 flex items-center ${
                activeTab === 'settings' ? 'bg-gray-600' : 'hover:bg-gray-600'
              }`}
            >
              <Settings size={18} className="mr-3" />
              Einstellungen
            </button>
            <button
              onClick={() => {
                handleLogout();
                setShowSidebar(false);
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-red-600 transition duration-200 flex items-center"
            >
              <LogOut size={18} className="mr-3" />
              Abmelden
            </button>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 bg-gray-800 text-white flex-col p-6 rounded-l-lg">
          <div className="flex items-center mb-8">
            <Shield size={24} className="text-sky-300 mr-2" />
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>
          
          <nav className="flex-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left p-3 rounded-lg mb-2 transition duration-200 flex items-center ${
                activeTab === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <Settings size={18} className="mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left p-3 rounded-lg mb-2 transition duration-200 flex items-center ${
                activeTab === 'users' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <Users size={18} className="mr-3" />
              Benutzer
            </button>
            <button
              onClick={() => setActiveTab('rides')}
              className={`w-full text-left p-3 rounded-lg mb-2 transition duration-200 flex items-center ${
                activeTab === 'rides' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <Car size={18} className="mr-3" />
              Fahrten
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full text-left p-3 rounded-lg mb-2 transition duration-200 flex items-center ${
                activeTab === 'reports' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <AlertTriangle size={18} className="mr-3" />
              Meldungen
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`w-full text-left p-3 rounded-lg mb-2 transition duration-200 flex items-center ${
                activeTab === 'content' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <FileText size={18} className="mr-3" />
              Inhalte
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left p-3 rounded-lg mb-2 transition duration-200 flex items-center ${
                activeTab === 'settings' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <Settings size={18} className="mr-3" />
              Einstellungen
            </button>
          </nav>

          <button
            onClick={handleLogout}
            className="w-full text-left p-3 rounded-lg hover:bg-red-600 transition duration-200 flex items-center mt-auto"
          >
            <LogOut size={18} className="mr-3" />
            Abmelden
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="bg-white p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'users' && 'Benutzer'}
              {activeTab === 'rides' && 'Fahrten'}
              {activeTab === 'reports' && 'Meldungen'}
              {activeTab === 'content' && 'Inhalte'}
              {activeTab === 'settings' && 'Einstellungen'}
            </h1>
            <button
              onClick={() => closeModal('adminDashboard')}
              className="text-red-500 hover:text-red-700 transition duration-200 md:hidden"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
};