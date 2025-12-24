import React, { useState } from 'react';
import { X, MapPin, Star, Save, Upload, Trash2 } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useAuth } from '../../hooks/useAuth';
import { useRestStops } from '../../hooks/useRestStops';
import { useDropzone } from 'react-dropzone';

export const CreateRestStopModal: React.FC = () => {
  const { closeModal } = useModals();
  const { user } = useAuth();
  const { createRestStop } = useRestStops();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Raststätte' as 'Raststätte' | 'Hotel' | 'Tankstelle' | 'Restaurant' | 'Route',
    route: 'eastern' as 'eastern' | 'baltic' | 'southern',
    location: '',
    address: '',
    rating: 4.0,
    description: '',
    fullDescription: '',
    image: null as File | null,
    imagePreview: '',
    amenities: [] as string[],
    coordinates: {
      lat: 0,
      lng: 0
    }
  });

  const availableAmenities = [
    'WC', 'Tankstelle', 'Grünfläche', 'Kinderfreundlich', 'Sport', 'Duschen', 
    'Hotel', 'Autowäsche', 'Restaurant', 'Parkplatz', 'Picknickplatz'
  ];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: URL.createObjectURL(file)
        }));
      }
    }
  });

  const removeImage = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: parseFloat(value) || 0
        }
      }));
    } else if (name === 'rating') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.address) {
      setSaveError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      let imageToSave = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg';

      if (formData.image) {
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            imageToSave = reader.result as string;
            resolve();
          };
          reader.onerror = () => reject(new Error('Fehler beim Lesen der Datei'));
          reader.readAsDataURL(formData.image);
        });
      }

      const newRestStop = {
        name: formData.name,
        type: formData.type,
        route: formData.route,
        location: formData.location,
        address: formData.address,
        rating: formData.rating,
        description: formData.description,
        full_description: formData.fullDescription,
        image: imageToSave,
        amenities: formData.amenities,
        coordinates: formData.coordinates
      };

      const result = await createRestStop(newRestStop, user?.id || null);

      if (result) {
        setSaveError(null);
        setTimeout(() => {
          closeModal('createRestStop');
        }, 1000);
      } else {
        setSaveError('Fehler beim Erstellen des Rest Stop. Bitte versuchen Sie es erneut.');
      }
    } catch (err) {
      console.error('Create error:', err);
      setSaveError(err instanceof Error ? err.message : 'Fehler beim Erstellen');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Neuen Rest Stop erstellen</h2>
          <button
            onClick={() => closeModal('createRestStop')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {saveError && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {saveError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="z.B. Raststätte Geiselwind"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Typ
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              >
                <option value="Raststätte">Raststätte</option>
                <option value="Hotel">Hotel</option>
                <option value="Tankstelle">Tankstelle</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Route">Route</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Route
              </label>
              <select
                name="route"
                value={formData.route}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              >
                <option value="eastern">Östliche Routen</option>
                <option value="baltic">Baltische und östliche Staaten</option>
                <option value="southern">Südliche Routen</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ort *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="z.B. Geiselwind"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bewertung
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="0.1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              placeholder="z.B. A3 Raststätte Geiselwind, 96160 Geiselwind"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bild hochladen
            </label>
            
            {formData.imagePreview ? (
              <div className="relative">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-sky-400 bg-sky-50'
                    : 'border-gray-300 hover:border-sky-300 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload size={48} className="text-gray-400 mb-2" />
                <p className="text-gray-600 text-center">
                  {isDragActive 
                    ? 'Bild hier ablegen...' 
                    : 'Klicken oder Bild hierher ziehen'
                  }
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG, GIF bis 5MB
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kurze Beschreibung
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent h-20 resize-none"
              placeholder="Kurze Beschreibung für die Karte..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vollständige Beschreibung
            </label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent h-32 resize-none"
              placeholder="Detaillierte Beschreibung für die Detailansicht..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ausstattung
            </label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {availableAmenities.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-gray-300 text-sky-500 focus:ring-sky-400"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Breitengrad
              </label>
              <input
                type="number"
                name="lat"
                value={formData.coordinates.lat}
                onChange={handleChange}
                step="any"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="z.B. 49.7667"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Längengrad
              </label>
              <input
                type="number"
                name="lng"
                value={formData.coordinates.lng}
                onChange={handleChange}
                step="any"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="z.B. 10.4667"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => closeModal('createRestStop')}
              disabled={saving}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-200 disabled:opacity-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition duration-200 flex items-center justify-center disabled:opacity-50"
            >
              <Save size={18} className="mr-2" />
              {saving ? 'Erstellen...' : 'Erstellen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};