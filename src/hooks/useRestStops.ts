import { useEffect, useState } from 'react';
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
  created_by: string | null;
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
      const { data, error } = await supabase
        .from('rest_stops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRestStops((data || []) as RestStop[]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching rest stops');
      setRestStops([]);
    } finally {
      setLoading(false);
    }
  };

  const updateRestStop = async (id: string, updates: Partial<RestStop>) => {
    try {
      const { data, error } = await supabase
        .from('rest_stops')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setRestStops(prev =>
        prev.map(stop => stop.id === id ? (data as RestStop) : stop)
      );

      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error updating rest stop');
    }
  };

  const createRestStop = async (newStop: Omit<RestStop, 'id' | 'created_at' | 'created_by'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('rest_stops')
        .insert({
          ...newStop,
          created_by: user?.id
        })
        .select()
        .single();

      if (error) throw error;

      setRestStops(prev => [data as RestStop, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error creating rest stop');
    }
  };

  const deleteRestStop = async (id: string) => {
    try {
      const { error } = await supabase
        .from('rest_stops')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRestStops(prev => prev.filter(stop => stop.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error deleting rest stop');
    }
  };

  return {
    restStops,
    loading,
    error,
    fetchRestStops,
    updateRestStop,
    createRestStop,
    deleteRestStop
  };
};
