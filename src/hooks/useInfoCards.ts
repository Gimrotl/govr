import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface InfoCard {
  id: string;
  title: string;
  description: string;
  link_text: string;
  order_index: number;
}

export function useInfoCards() {
  const [cards, setCards] = useState<InfoCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('info_cards')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setCards(data || []);
    }
    setLoading(false);
  };

  const updateCard = async (id: string, updates: Partial<InfoCard>) => {
    try {
      const { error } = await supabase
        .from('info_cards')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Update error:', error);
        setError(error.message);
        return false;
      }

      await fetchCards();
      setError(null);
      return true;
    } catch (err) {
      console.error('Update exception:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(errorMessage);
      return false;
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return { cards, loading, error, updateCard, refetch: fetchCards };
}
