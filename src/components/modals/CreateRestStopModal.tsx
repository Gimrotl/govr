import React, { useState } from 'react';
import { X, MapPin, Star, Save, Upload, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
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
  const [images, setImages] = useState<Array<{ id: string; file?: File; url?: string }>>([]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Raststätte' as 'Raststätte' | 'Hotel' | 'Tankstelle' | 'Restaurant' | 'Route',
    route: 'eastern' as 'eastern' | 'baltic' | 'southern',
    location: '',
    address: '',
    rating: 4.0,
    description: '',
    fullDescription: '',
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
    maxSize: 5242880,
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map(file => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  });

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image?.url && image.file) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    setImages(prev => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      return newImages;
    });
  };

  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return;
    setImages(prev => {
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return newImages;
    });
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
      const imageUrls: string[] = [];

      for (const image of images) {
        if (image.file) {
          await new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              imageUrls.push(reader.result as string);
              resolve();
            };
            reader.onerror = () => reject(new Error('Fehler beim Lesen der Datei'));
            reader.readAsDataURL(image.file);
          });
        }
      }

      const mainImage = imageUrls.length > 0 ? imageUrls[0] : null;

      const newRestStop = {
        name: formData.name,
        type: formData.type,
        route: formData.route,
        location: formData.location,
        address: formData.address,
        rating: formData.rating,
        description: formData.description,
        full_description: formData.fullDescription,
        image: mainImage,
        images: imageUrls,
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
              Bilder verwalten
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-3">
                {images.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <div className="relative h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={image.url}
                        alt={`Bild ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Hauptbild
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => moveImageUp(index)}
                          disabled={index === 0}
                          className={`p-1.5 rounded transition duration-200 ${
                            index === 0
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                              : 'bg-sky-500 text-white hover:bg-sky-600'
                          }`}
                          title="Nach oben"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImageDown(index)}
                          disabled={index === images.length - 1}
                          className={`p-1.5 rounded transition duration-200 ${
                            index === images.length - 1
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                              : 'bg-sky-500 text-white hover:bg-sky-600'
                          }`}
                          title="Nach unten"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                          title="Löschen"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              {...getRootProps()}
              className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-sky-400 bg-sky-50'
                  : 'border-gray-300 hover:border-sky-300 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload size={36} className="text-gray-400 mb-2" />
              <p className="text-gray-600 text-center text-sm">
                {isDragActive
                  ? 'Bilder hier ablegen...'
                  : 'Klicken oder Bilder hierher ziehen'
                }
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF bis 5MB (mehrere möglich)
              </p>
            </div>
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