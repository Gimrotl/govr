import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface RestStop {
  id: string;
  name: string;
  type: 'Raststätte' | 'Hotel' | 'Tankstelle' | 'Restaurant';
  location: string;
  address: string;
  rating: number;
  description: string;
  full_description: string;
  image: string;
  amenities: string[];
  route: 'eastern' | 'baltic' | 'southern';
  coordinates: {
    lat: number;
    lng: number;
  };
  created_at: string;
  created_by: string;
  updated_at: string;
  hidden_image_indices?: number[];
}

export const useRestStops = () => {
  const [restStops, setRestStops] = useState<RestStop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRestStops();
  }, []);

  const fetchRestStops = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('rest_stops')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setRestStops(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Laden der Rest Stops');
      console.error('Error fetching rest stops:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateRestStop = async (
    id: string,
    updates: Partial<RestStop> & Record<string, any>
  ): Promise<boolean> => {
    try {
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };

      if (updates.full_description !== undefined) {
        updateData.full_description = updates.full_description;
      }
      if (updates.description !== undefined) {
        updateData.description = updates.description;
      }
      if (updates.address !== undefined) {
        updateData.address = updates.address;
      }
      if (updates.location !== undefined) {
        updateData.location = updates.location;
      }
      if (updates.amenities !== undefined) {
        updateData.amenities = updates.amenities;
      }
      if (updates.hidden_image_indices !== undefined) {
        updateData.hidden_image_indices = updates.hidden_image_indices;
      }
      if (updates.name !== undefined) {
        updateData.name = updates.name;
      }
      if (updates.type !== undefined) {
        updateData.type = updates.type;
      }
      if (updates.image !== undefined) {
        updateData.image = updates.image;
      }
      if (updates.rating !== undefined) {
        updateData.rating = updates.rating;
      }
      if (updates.coordinates !== undefined) {
        updateData.coordinates = updates.coordinates;
      }
      if (updates.route !== undefined) {
        updateData.route = updates.route;
      }

      const { data, error: updateError } = await supabase
        .from('rest_stops')
        .update(updateData)
        .eq('id', id)
        .select();

      if (updateError) {
        console.error('Supabase update error:', updateError);
        throw updateError;
      }

      setRestStops((prev) =>
        prev.map((stop) =>
          stop.id === id ? { ...stop, ...updateData } : stop
        )
      );
      return true;
    } catch (err: any) {
      setError(err.message || 'Fehler beim Aktualisieren des Rest Stops');
      console.error('Error updating rest stop:', err);
      return false;
    }
  };

  const deleteRestStop = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('rest_stops')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setRestStops((prev) => prev.filter((stop) => stop.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Fehler beim Löschen des Rest Stops');
      console.error('Error deleting rest stop:', err);
      return false;
    }
  };

  const createRestStop = async (newStop: Omit<RestStop, 'id' | 'created_at' | 'updated_at' | 'created_by'>): Promise<RestStop | null> => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Nicht authentifiziert');

      const { data, error: createError } = await supabase
        .from('rest_stops')
        .insert([
          {
            ...newStop,
            created_by: userData.user.id,
          },
        ])
        .select()
        .single();

      if (createError) throw createError;
      if (data) setRestStops((prev) => [data, ...prev]);
      return data || null;
    } catch (err: any) {
      setError(err.message || 'Fehler beim Erstellen des Rest Stops');
      console.error('Error creating rest stop:', err);
      return null;
    }
  };

  return {
    restStops,
    loading,
    error,
    fetchRestStops,
    updateRestStop,
    deleteRestStop,
    createRestStop,
  };
};
