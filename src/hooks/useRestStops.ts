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
  coordinates: {
    lat: number;
    lng: number;
  };
  created_at: string;
  created_by: string;
  updated_at: string;
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
    updates: Partial<RestStop>
  ): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from('rest_stops')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) throw updateError;

      setRestStops((prev) =>
        prev.map((stop) =>
          stop.id === id ? { ...stop, ...updates, updated_at: new Date().toISOString() } : stop
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
