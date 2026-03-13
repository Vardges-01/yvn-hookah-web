// src/pages/PokerDisplay.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Timer } from "../../components/poker/Timer";
import { Header } from "../../components/poker/Header";
import usePokerSocket from "../../hooks/usePokerSocket";
import { useBlindPresets } from "../../hooks/useBlindPresets";
import useTimer from "../../hooks/useTimer";

function PokerDisplay() {
  const [searchParams] = useSearchParams();
  const [roomCode, setRoomCode] = useState(searchParams.get("code"));

  const { presets, reload } = useBlindPresets();
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");
//   const [lastSelectedPresetId, setLastSelectedPresetId] = useState<string>("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showQR, setShowQR] = useState(false);

  console.log("Selected Preset ID:", selectedPresetId);

  const selectedPreset = presets.find((p) => p.id === selectedPresetId);
  const levels = selectedPreset?.levels || [];

  const { timeLeft, setTimeLeft } = useTimer({
    levels,
    currentLevel,
    isRunning,
    onLevelAdvance: (nextLevel) => setCurrentLevel(nextLevel),
    onTimerStop: () => setIsRunning(false),
  });

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
      setTimeLeft(levels[0]?.duration * 60 || 0);
    },
    onPresetChanged: (presetId) => {
      setSelectedPresetId(presetId);
      reload();
      setCurrentLevel(0);
      const found = presets.find((p) => p.id === presetId);
      if (found) setTimeLeft(found.levels[0]?.duration * 60 || 0);
    },
    onAdjustTime: (delta) => {
      console.log("Adjusting time by:", delta);
      setTimeLeft((prev) => Math.max(prev + delta, 0));
    },
  });

  useEffect(() => {
    if (presets.length > 0 && !selectedPresetId) {
      setSelectedPresetId(presets[0].id);
      setTimeLeft(presets[0].levels[0].duration * 60);
    }
  }, [presets, selectedPresetId, setTimeLeft]);

  const getPreviousLevel = () => {
    if (currentLevel > 0) {
      const prev = levels[currentLevel - 1];
      return prev?.isBreak
        ? "BREAK"
        : `${prev?.smallBlind} / ${prev?.bigBlind}`;
    }
    return "";
  };

  const getNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      const next = levels[currentLevel + 1];
      return next?.isBreak
        ? "BREAK"
        : `${next?.smallBlind} / ${next?.bigBlind}`;
    }
    return "FINAL";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-black opacity-30 pointer-events-none"></div>

      <Header
        isRunning={isRunning}
        onTogglePlay={() => setIsRunning((prev) => !prev)}
        onReset={() => {
          setIsRunning(false);
          setCurrentLevel(0);
          setTimeLeft(levels[0]?.duration * 60 || 0);
        }}
        onOpenSettings={() => {}}
        controllerCode={roomCode || ""}
        isController={false}
        showQR={showQR}
        setShowQR={setShowQR}
      />

      {/* Preset Name - Compact Top Bar */}
      <div className="relative px-8 py-2 border-b border-gray-800 flex-shrink-0">
        <div className="text-sm text-gray-400 uppercase tracking-widest">Tournament</div>
        <div className="text-xl font-black text-white">
          {selectedPreset?.name || 'Loading...'}
        </div>
      </div>

      {/* Timer Component */}
      {selectedPreset && (
        <Timer
          timeLeft={timeLeft}
          currentLevel={currentLevel}
          blinds={levels[currentLevel]}
          previousLevel={getPreviousLevel()}
          nextLevel={getNextLevel()}
        />
      )}
    </div>
  );
}

export default PokerDisplay;
