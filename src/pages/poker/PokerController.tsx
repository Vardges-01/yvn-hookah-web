// src/pages/PokerController.tsx
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ControlPanel from '../../components/poker/ControlPanel';
import { SettingsModal } from '../../components/poker/SettingsModal';
import { supabase } from '../../lib/supabase';
import { BlindPreset, Level } from '../../types/blind.types';
import { Header } from '../../components/poker/Header';
import usePokerSocket from '../../hooks/usePokerSocket';
import { useBlindPresets } from '../../hooks/useBlindPresets';

function PokerController() {
    const [searchParams] = useSearchParams();
    const roomCode = searchParams.get('code');

    const [selectedPresetId, setSelectedPresetId] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const { presets, reload: reloadPresets } = useBlindPresets();
    const presetsRef = useRef<BlindPreset[]>([]);

    const socket = usePokerSocket(roomCode, {
        onTogglePlay: () => setIsRunning((prev) => !prev),
        onReset: () => {
            setCurrentLevel(0);
            setIsRunning(false);
        },
        onPresetChanged: (presetId) => {
            setSelectedPresetId(presetId);
            setCurrentLevel(0);
        }
    });

    const selectedPreset = presets.find((p) => p.id === selectedPresetId);

    const updatePreset = async (presetId: string, levels: Level[]) => {
        await supabase.from('levels').delete().eq('preset_id', presetId);
        const levelsToInsert = levels.map((level, index) => ({
            preset_id: presetId,
            small_blind: level.smallBlind,
            big_blind: level.bigBlind,
            duration: level.duration,
            position: index,
            is_break: level.isBreak || false,
        }));
        await supabase.from('levels').insert(levelsToInsert);
        await reloadPresets();
    };

    const savePreset = async (name: string, levels: Level[]) => {
        const { data: preset } = await supabase
            .from('presets')
            .insert({ name })
            .select()
            .single();

        if (!preset) return;

        const levelsToInsert = levels.map((level, index) => ({
            preset_id: preset.id,
            small_blind: level.smallBlind,
            big_blind: level.bigBlind,
            duration: level.duration,
            position: index,
            is_break: level.isBreak || false,
        }));
        await supabase.from('levels').insert(levelsToInsert);
        await reloadPresets();
    };

    const handleTogglePlay = () => {
        socket.emit('control', { room: roomCode, command: 'togglePlay' });
    };

    const handleReset = () => {
        socket.emit('control', { room: roomCode, command: 'reset' });
    };

    const handlePresetChange = (presetId: string) => {
        socket.emit('changePreset', { room: roomCode, presetId });
    };

    const handleUpdateLevels = (updatedLevels: Level[]) => {
        if (selectedPresetId) {
            updatePreset(selectedPresetId, updatedLevels);
        }
    };

    useEffect(() => {
        presetsRef.current = presets;
        if (presets.length > 0 && !selectedPresetId) {
            setSelectedPresetId(presets[0].id);
        }
    }, [presets]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
            <Header
                isRunning={isRunning}
                onTogglePlay={handleTogglePlay}
                onReset={handleReset}
                onOpenSettings={() => setIsSettingsOpen(true)}
                controllerCode={roomCode || ''}
                isController={true}
                showQR={showQR}
                setShowQR={setShowQR}
            />

            {selectedPreset && (
                <ControlPanel
                    isRunning={isRunning}
                    onTogglePlay={handleTogglePlay}
                    onReset={handleReset}
                    currentLevel={currentLevel}
                    blinds={selectedPreset.levels[currentLevel]}
                    presets={presets}
                    selectedPresetId={selectedPresetId}
                    onPresetChange={handlePresetChange}
                />
            )}

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                levels={selectedPreset?.levels || []}
                onUpdateLevels={handleUpdateLevels}
                onSaveNewPreset={savePreset}
                presetName={selectedPreset?.name || ''}
            />
        </div>
    );
}

export default PokerController;