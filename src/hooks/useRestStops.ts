import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface RestStop {
  id: string;
  name: string;
  type: 'Raststätte' | 'Hotel' | 'Tankstelle' | 'Restaurant' | 'Route';
  location: string;
  address: string;
  rating: number;
  description: string;
  full_description: string;
  image: string;
  images: string[];
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  route: 'eastern' | 'baltic' | 'southern';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export function useRestStops() {
  const [restStops, setRestStops] = useState<RestStop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestStops = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('rest_stops')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        setRestStops([]);
      } else {
        setRestStops(data || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(errorMessage);
      setRestStops([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRestStop = async (id: string, updates: Partial<RestStop>) => {
    try {
      const { error: updateError } = await supabase
        .from('rest_stops')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (updateError) {
        setError(updateError.message);
        return false;
      }

      await fetchRestStops();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(errorMessage);
      return false;
    }
  };

  const createRestStop = async (newRestStop: Omit<RestStop, 'id' | 'created_at' | 'updated_at' | 'created_by'>, userId: string | null) => {
    try {
      const { data, error: createError } = await supabase
        .from('rest_stops')
        .insert({
          ...newRestStop,
          created_by: userId || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();

      if (createError) {
        setError(createError.message);
        return null;
      }

      await fetchRestStops();
      return data?.[0] || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(errorMessage);
      return null;
    }
  };

  const deleteRestStop = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('rest_stops')
        .delete()
        .eq('id', id);

      if (deleteError) {
        setError(deleteError.message);
        return false;
      }

      await fetchRestStops();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(errorMessage);
      return false;
    }
  };

  useEffect(() => {
    fetchRestStops();
  }, [fetchRestStops]);

  return {
    restStops,
    loading,
    error,
    updateRestStop,
    createRestStop,
    deleteRestStop,
    refetch: fetchRestStops
  };
}
