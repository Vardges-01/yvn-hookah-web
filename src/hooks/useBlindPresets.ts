// src/hooks/useBlindPresets.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlindPreset } from '../types/blind.types';

export function useBlindPresets() {
  const [presets, setPresets] = useState<BlindPreset[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPresets = async () => {
    setLoading(true);
    try {
      const { data: presetsData, error: presetsError } = await supabase
        .from('presets')
        .select('id, name')
        .order('created_at', { ascending: true });

      if (presetsError || !presetsData) throw presetsError;

      const presetsWithLevels = await Promise.all(
        presetsData.map(async (preset) => {
          const { data: levelsData } = await supabase
            .from('levels')
            .select('*')
            .eq('preset_id', preset.id)
            .order('position', { ascending: true });

          return {
            id: preset.id,
            name: preset.name,
            levels: levelsData.map((level) => ({
              smallBlind: level.small_blind,
              bigBlind: level.big_blind,
              duration: level.duration,
              isBreak: level.is_break,
            })),
          };
        })
      );

      setPresets(presetsWithLevels);
    } catch (error) {
      console.error('Error loading presets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPresets();
    console.log("AAAAAAAAAAAAAAAA")
    console.log(presets)
    console.log("AAAAAAAAAAAAAAAA")
  }, []);

  return {
    presets,
    loading,
    reload: loadPresets,
  };
}
