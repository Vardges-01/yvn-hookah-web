import { useState, useEffect, useRef } from 'react';
import { ControllerSetup } from '../../components/poker/ControllerSetup';
import { Header } from '../../components/poker/Header';
import { SettingsModal } from '../../components/poker/SettingsModal';
import { Timer } from '../../components/poker/Timer';
import ControlPanel from '../../components/poker/ControlPanel';
import useSocket from '../../lib/socket';
import { supabase } from '../../lib/supabase';


interface Level {
    smallBlind: number;
    bigBlind: number;
    duration: number;
    isBreak?: boolean;
}

// interface TimerState {
//     isRunning: boolean;
//     currentLevel: number;
//     timeLeft: number;
// }

interface BlindPreset {
    id: string;
    name: string;
    levels: Level[];
}

function PokerTimer() {
  const socket = useSocket();

  const [isController, setIsController] = useState(false);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [levels, setLevels] = useState<Level[]>([
    { smallBlind: 5, bigBlind: 10, duration: 10 },
    { smallBlind: 10, bigBlind: 20, duration: 10 },
    { smallBlind: 15, bigBlind: 30, duration: 15 },
    { smallBlind: 25, bigBlind: 50, duration: 15 },
    { smallBlind: 50, bigBlind: 100, duration: 20 },
    { smallBlind: 75, bigBlind: 150, duration: 20 },
    { smallBlind: 100, bigBlind: 200, duration: 25 },
    { smallBlind: 150, bigBlind: 300, duration: 25 },
  ]);

  const [socketConnected, setSocketConnected] = useState(false);

  const [currentLevel, setCurrentLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);

  const [presets, setPresets] = useState<BlindPreset[]>([]);

  const [selectedPresetId, setSelectedPresetId] = useState(presets[0]?.id);

  const presetsRef = useRef<BlindPreset[]>([]);

  const tickAudio = useRef<HTMLAudioElement | null>(null);
  const gongAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    presetsRef.current = presets;
  }, [presets]);

  useEffect(() => {
    tickAudio.current = new Audio("tiktak.mp3");
    tickAudio.current.volume = 1;

    gongAudio.current = new Audio("gong.mp3");
    gongAudio.current.volume = 0.5;
  }, []);

  const selectedPreset =
    presets.find((p) => p.id === selectedPresetId) || presets[0];

  const handleTimerControl = (command: string) => {
    if (command === "togglePlay") {
      setIsRunning((prev) => !prev);
    } else if (command === "reset") {
      handleReset();
    }
  };

  const handleRoomCreated = (roomId: string) => {
    setRoomCode(roomId);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", "display");
    url.searchParams.set("code", roomId);
    window.history.pushState({}, "", url.toString());
  };

  const handleRoomJoined = (room: string) => {
    setShowQR(false);
    console.log("Room joined:", room);
  };

  const handleSetup = (code: string) => {
    if (code === "display") {
      socket.emit("createRoom");
    } else {
      setRoomCode(code);
      socket.emit("joinRoom", code);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentLevel(0);
    setTimeLeft(levels[0].duration * 60);
  };

  const getPreviousLevel = () => {
    if (currentLevel > 0) {
      const prev = levels[currentLevel - 1];
      return prev.isBreak ? "BREAK" : `${prev.smallBlind} / ${prev.bigBlind}`;
    }
    return "";
  };

  const getNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      const next = levels[currentLevel + 1];
      return next.isBreak ? "BREAK" : `${next.smallBlind} / ${next.bigBlind}`;
    }
    return "FINAL";
  };

  const handleUpdateLevels = (updatedLevels: Level[]) => {
    if (selectedPresetId) {
      updatePreset(selectedPresetId, updatedLevels);
    }
    // setLevels(updatedLevels);
    // setTimeLeft(updatedLevels[currentLevel].duration * 60);
  };

  const handleTogglePlay = () => {
    socket.emit("control", { room: roomCode, command: "togglePlay" });
  };

  const handlePresetChange = (presetId: string) => {
    socket.emit("changePreset", { room: roomCode, presetId });
  };

  const loadPresets = async () => {
    try {
      const { data: presetsData, error: presetsError } = await supabase
        .from("presets")
        .select("id, name")
        .order("created_at", { ascending: true });

      if (presetsError) throw presetsError;

      const presetsWithLevels = await Promise.all(
        presetsData.map(async (preset) => {
          const { data: levelsData, error: levelsError } = await supabase
            .from("levels")
            .select("*")
            .eq("preset_id", preset.id)
            .order("position", { ascending: true });

          if (levelsError) throw levelsError;

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
      if (presetsWithLevels.length > 0) {
        setSelectedPresetId(presetsWithLevels[0].id);
        setLevels(presetsWithLevels[0].levels);
        setTimeLeft(presetsWithLevels[0].levels[0].duration * 60);
      }
    } catch (error) {
      console.error("Error loading presets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreset = async (name: string, levels: Level[]) => {
    try {
      const { data: preset, error: presetError } = await supabase
        .from("presets")
        .insert({ name })
        .select()
        .single();

      if (presetError) throw presetError;

      const levelsToInsert = levels.map((level, index) => ({
        preset_id: preset.id,
        small_blind: level.smallBlind,
        big_blind: level.bigBlind,
        duration: level.duration,
        position: index,
        is_break: level.isBreak || false,
      }));

      const { error: levelsError } = await supabase
        .from("levels")
        .insert(levelsToInsert);

      if (levelsError) throw levelsError;

      await loadPresets();
    } catch (error) {
      console.error("Error saving preset:", error);
    }
  };

  const updatePreset = async (presetId: string, levels: Level[]) => {
    try {
      // Delete existing levels
      const { error: deleteError } = await supabase
        .from("levels")
        .delete()
        .eq("preset_id", presetId);

      if (deleteError) throw deleteError;

      // Insert new levels
      const levelsToInsert = levels.map((level, index) => ({
        preset_id: presetId,
        small_blind: level.smallBlind,
        big_blind: level.bigBlind,
        duration: level.duration,
        position: index,
        is_break: level.isBreak || false,
      }));

      const { error: insertError } = await supabase
        .from("levels")
        .insert(levelsToInsert);

      if (insertError) throw insertError;

      await loadPresets();
    } catch (error) {
      console.error("Error updating preset:", error);
    }
  };

  useEffect(() => {
    if (socket) {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get("mode");
      const code = params.get("code");

      if (mode === "controller" && code) {
        setIsController(true);
        handleSetup(code);
      }
      setSocketConnected(true);
      loadPresets();

      // Socket Listeners
      socket.on("timerControl", handleTimerControl);
      socket.on("roomCreated", handleRoomCreated);
      socket.on("roomJoined", handleRoomJoined);
      socket.on("presetChanged", async (presetId: string) => {
        setSelectedPresetId(presetId);
        setCurrentLevel(0);
        const newPreset =
          presetsRef.current.find((p) => p.id === presetId) || presets[0];
        setTimeLeft(newPreset.levels[0].duration * 60);
      });

      return () => {
        socket.off("timerControl", handleTimerControl);
        socket.off("roomCreated", handleRoomCreated);
        socket.off("roomJoined", handleRoomJoined);
      };
    } else {
      setSocketConnected(false);
    }
  }, [socket]);

  useEffect(() => {
    if (roomCode) {
      socket.on("timerControl", (command) => {
        if (command === "togglePlay") {
          setIsRunning(!isRunning);
        } else if (command === "reset") {
          handleReset();
        }
      });
    }
    return () => {
      // socket.disconnect();
    };
  }, [roomCode, isRunning]);

  useEffect(() => {
    let interval: any | undefined;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 7 && prevTime > 1) {
            if (tickAudio.current) {
              tickAudio.current.pause();
              tickAudio.current.currentTime = 0;
              tickAudio.current.play();
            }
          }

          if (prevTime === 2) {
            if (gongAudio.current) {
              tickAudio.current.pause();
              gongAudio.current.pause();
              gongAudio.current.currentTime = 0;
              gongAudio.current.play();
            }
          }

          if (prevTime <= 1) {
            if (currentLevel < levels.length - 1) {
              setCurrentLevel((prev) => prev + 1);
              return levels[currentLevel + 1].duration * 60;
            }
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, currentLevel, levels]);

  if (!socketConnected) {
    return <div className="text-white">Connecting to server...</div>;
  }

  if (!roomCode) {
    return <ControllerSetup />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      <Header
        isRunning={isRunning}
        onTogglePlay={handleTogglePlay}
        onReset={handleReset}
        onOpenSettings={() => setIsSettingsOpen(true)}
        controllerCode={roomCode}
        isController={isController}
        showQR={showQR}
        setShowQR={setShowQR}
      />

      {!isController ? (
        <Timer
          timeLeft={timeLeft}
          currentLevel={currentLevel}
          blinds={selectedPreset?.levels[currentLevel]}
          previousLevel={getPreviousLevel()}
          nextLevel={getNextLevel()}
        />
      ) : (
        <ControlPanel
          isRunning={isRunning}
          onTogglePlay={handleTogglePlay}
          onReset={handleReset}
          currentLevel={currentLevel}
          blinds={selectedPreset?.levels[currentLevel]}
          presets={presets}
          selectedPresetId={selectedPresetId}
          onPresetChange={handlePresetChange}
        />
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        levels={selectedPreset?.levels}
        onUpdateLevels={handleUpdateLevels}
        onSaveNewPreset={savePreset}
        presetName={selectedPreset.name}
      />
    </div>
  );
}

export default PokerTimer;