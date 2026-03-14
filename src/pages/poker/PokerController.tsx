// src/pages/PokerController.tsx
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ControlPanel from '../../components/poker/ControlPanel';
import { SettingsModal } from '../../components/poker/SettingsModal';
import { supabase } from '../../lib/supabase';
import { BlindPreset, Level } from '../../types/blind.types';
import { Header } from '../../components/poker/Header';
import usePokerSocket from '../../hooks/usePokerSocket';
import { useBlindPresets } from '../../hooks/useBlindPresets';

function PokerController() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const roomCode = searchParams.get('code');
    const [inputCode, setInputCode] = useState('');

    const [selectedPresetId, setSelectedPresetId] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const { presets, reload: reloadPresets, loading } = useBlindPresets();
    const presetsRef = useRef<BlindPreset[]>([]);

    const handleCodeSubmit = () => {
        if (inputCode.trim()) {
            navigate(`/poker/controller?code=${inputCode.trim()}`);
        }
    };

    if (!roomCode) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <button
                        onClick={() => navigate('/poker')}
                        className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-8">Enter Display Code</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Display Code (digits only)
                                </label>
                                <input
                                    type="text"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value.replace(/[^0-9]/g, ''))}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCodeSubmit();
                                        }
                                    }}
                                    placeholder="e.g., 123456"
                                    className="w-full px-4 py-3 bg-gray-700 text-white text-center text-lg font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                    maxLength={10}
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={handleCodeSubmit}
                                disabled={!inputCode.trim()}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { socket, isConnected } = usePokerSocket(roomCode, {
        onTogglePlay: () => setIsRunning((prev) => !prev),
        onReset: () => {
            setCurrentLevel(0);
            setIsRunning(false);
        },
        onPresetChanged: (presetId) => {
            setSelectedPresetId(presetId);
            setCurrentLevel(0);
        },
        onAdjustTime: (delta: number) => {
            console.log("Adjusting time by:", delta);
            // Time adjustment is handled on the display side
        },
        onAdjustLevel: (delta: number) => {
            setCurrentLevel((prev) => {
                const newLevel = prev + delta;
                const maxLevel = selectedPreset?.levels.length ? selectedPreset.levels.length - 1 : 0;
                return Math.max(0, Math.min(newLevel, maxLevel));
            });
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
        socket.emit('changePreset', { room: roomCode, presetId });
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

    const handleAdjustTime = (time: number) => {
        socket.emit('adjustTime', { room: roomCode, time });
    };

    const handleAdjustLevel = (level: number) => {
        socket.emit('adjustLevel', { room: roomCode, level });
    };

    useEffect(() => {
        presetsRef.current = presets;
        if (presets.length > 0 && !selectedPresetId) {
            setSelectedPresetId(presets[0].id);
        }
    }, [presets, selectedPresetId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
            {!isConnected ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-4xl mb-4">🔌</div>
                        <div className="text-2xl mb-4">Connecting to display...</div>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                </div>
            ) : (
                <>
                    <Header
                        isRunning={isRunning}
                        selectedPreset={selectedPreset} 
                        onTogglePlay={handleTogglePlay}
                        onReset={handleReset}
                        onOpenSettings={() => setIsSettingsOpen(true)}
                        controllerCode={roomCode || ''}
                        isController={true}
                        showQR={showQR}
                        setShowQR={setShowQR}
                    />

                    {loading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl mb-4">Loading presets...</div>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            </div>
                        </div>
                    ) : presets.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl mb-4">No presets available</div>
                                <p className="text-gray-400">Create a preset in the settings</p>
                            </div>
                        </div>
                    ) : selectedPreset ? (
                        <ControlPanel
                            isRunning={isRunning}
                            onTogglePlay={handleTogglePlay}
                            onReset={handleReset}
                            currentLevel={currentLevel}
                            blinds={selectedPreset.levels[currentLevel]}
                            presets={presets}
                            selectedPresetId={selectedPresetId}
                            onPresetChange={handlePresetChange}
                            onAdjustTime={handleAdjustTime}
                            onAdjustLevel={handleAdjustLevel}
                        />
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl mb-4">Initializing...</div>
                            </div>
                        </div>
                    )}

                    <SettingsModal
                        isOpen={isSettingsOpen}
                        onClose={() => setIsSettingsOpen(false)}
                        levels={selectedPreset?.levels || []}
                        onUpdateLevels={handleUpdateLevels}
                        onSaveNewPreset={savePreset}
                        presetName={selectedPreset?.name || ''}
                    />
                </>
            )}
        </div>
    );
}

export default PokerController;