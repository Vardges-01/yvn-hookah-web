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
      if (selectedPresetId === "") {
        setSelectedPresetId(presets[0].id);
      }
      setTimeLeft(presets[0].levels[0].duration * 60);
    }
  }, [presets]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      <Header
        isRunning={isRunning}
        onTogglePlay={() => {}}
        onReset={() => {}}
        onOpenSettings={() => {}}
        controllerCode={roomCode || ""}
        isController={false}
        showQR={showQR}
        setShowQR={setShowQR}
      />
      <div className="text-center text-4xl font-bold mt-8">
        <span className="border-2 py-2 px-10 rounded-xl">
          {selectedPreset?.name}
        </span>
      </div>

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
