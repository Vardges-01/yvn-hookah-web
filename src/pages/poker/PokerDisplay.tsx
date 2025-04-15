// src/pages/PokerDisplay.tsx
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Timer } from '../../components/poker/Timer';
import { Header } from '../../components/poker/Header';
import usePokerSocket from '../../hooks/usePokerSocket';
import { BlindPreset, Level } from '../../types/blind.types';
import useTimerAudio from '../../hooks/useTimerAudio';
import { useBlindPresets } from '../../hooks/useBlindPresets';

function PokerDisplay() {
    const [searchParams] = useSearchParams();
    const [roomCode, setRoomCode] = useState(searchParams.get('code'));
    const { presets, loading } = useBlindPresets();

    const [selectedPresetId, setSelectedPresetId] = useState<string>('');
    const [currentLevel, setCurrentLevel] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const presetsRef = useRef<BlindPreset[]>([]);

    const { tickAudio, gongAudio } = useTimerAudio();

    const handleRoomCreated = (roomId: string) => {
        setRoomCode(roomId);
        const url = new URL(window.location.href);
        url.searchParams.set("code", roomId);
        window.history.pushState({}, "", url.toString());
    };

    usePokerSocket(roomCode, {
        onRoomCreated: handleRoomCreated,
        onTogglePlay: () => setIsRunning((prev) => !prev),
        onReset: () => {
            setIsRunning(false);
            setCurrentLevel(0);
            setTimeLeft(presetsRef.current[0]?.levels[0]?.duration * 60 || 0);
        },
        onPresetChanged: (presetId) => {
            setSelectedPresetId(presetId);
            setCurrentLevel(0);
            const found = presetsRef.current.find((p) => p.id === presetId);
            if (found) setTimeLeft(found.levels[0]?.duration * 60 || 0);
        },
    });

    const getPreviousLevel = () => {
        if (currentLevel > 0) {
            const prev = selectedPreset?.levels[currentLevel - 1];
            return prev?.isBreak ? 'BREAK' : `${prev?.smallBlind} / ${prev?.bigBlind}`;
        }
        return '';
    };

    const getNextLevel = () => {
        if (currentLevel < (selectedPreset?.levels.length || 0) - 1) {
            const next = selectedPreset?.levels[currentLevel + 1];
            return next?.isBreak ? 'BREAK' : `${next?.smallBlind} / ${next?.bigBlind}`;
        }
        return 'FINAL';
    };

    const selectedPreset = presets.find((p) => p.id === selectedPresetId);

    useEffect(() => {
        presetsRef.current = presets;
    }, [presets]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 7 && prevTime > 1 && tickAudio.current) {
                        tickAudio.current.pause();
                        tickAudio.current.currentTime = 0;
                        tickAudio.current.play();
                    }
                    if (prevTime === 2 && gongAudio.current) {
                        tickAudio.current?.pause();
                        gongAudio.current.pause();
                        gongAudio.current.currentTime = 0;
                        gongAudio.current.play();
                    }
                    if (prevTime <= 1) {
                        if (currentLevel < (selectedPreset?.levels.length || 0) - 1) {
                            setCurrentLevel((prev) => prev + 1);
                            return selectedPreset?.levels[currentLevel + 1].duration * 60 || 0;
                        }
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning, timeLeft, currentLevel, selectedPreset]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
            <Header
                isRunning={isRunning}
                onTogglePlay={() => { }}
                onReset={() => { }}
                onOpenSettings={() => { }}
                controllerCode={roomCode || ''}
                isController={false}
                showQR={showQR}
                setShowQR={setShowQR}
            />

            {selectedPreset && (
                <Timer
                    timeLeft={timeLeft}
                    currentLevel={currentLevel}
                    blinds={selectedPreset.levels[currentLevel]}
                    previousLevel={getPreviousLevel()}
                    nextLevel={getNextLevel()}
                />
            )}
        </div>
    );
}

export default PokerDisplay;