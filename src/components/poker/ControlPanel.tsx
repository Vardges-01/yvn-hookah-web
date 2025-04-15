import { Pause, Play, RotateCcw } from "lucide-react";

interface ControlPanelProps {
  isRunning: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  blinds: { smallBlind: number; bigBlind: number };
  currentLevel: number;
  presets: any[];
  selectedPresetId?: string;
  onPresetChange?: (presetId: string) => void;
  onAdjustTime?: (delta: number) => void;
}

const ControlPanel = ({
  isRunning,
  onTogglePlay,
  onReset,
  blinds,
  currentLevel,
  presets,
  selectedPresetId,
  onPresetChange,
  onAdjustTime
}: ControlPanelProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-start gap-8 p-8">
      {presets && selectedPresetId && onPresetChange && (
        <select
          value={selectedPresetId}
          onChange={(e) => onPresetChange(e.target.value)}
          className="w-64 px-4 py-2 bg-gray-700 text-white rounded-lg text-center text-lg"
          disabled={isRunning}
        >
          {presets.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
      )}

      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col gap-3">
          <button
            className="w-20 h-20 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transition-colors"
            onClick={() => onAdjustTime(-60)}
          >
            -1 min
          </button>
          <button
            className="w-20 h-20 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transition-colors"
            onClick={() =>
              console.log("-1 lvl")
            }
          >
            -1 lvl
          </button>
        </div>
        <button
          onClick={onTogglePlay}
          className="w-40 h-40 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-colors"
        >
          {isRunning ? (
            <Pause className="w-24 h-24" />
          ) : (
            <Play className="w-24 h-24" />
          )}
        </button>
        <div className="flex flex-col gap-3">
          <button
            className="w-20 h-20 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transition-colors"
            onClick={() => onAdjustTime(60)}
          >
            +1 min
          </button>
          <button
            className="w-20 h-20 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transition-colors"
            onClick={() =>
              /*socket.emit('adjustTime', { room: roomCode, delta: 60 })*/
              console.log("-1 min")
            }
          >
            +1 lvl
          </button>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-20 h-20 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transition-colors"
      >
        <RotateCcw className="w-12 h-12" />
      </button>

      <div className="text-2xl font-semibold mt-4">
        Level {currentLevel + 1}: {blinds.smallBlind} / {blinds.bigBlind}
      </div>
    </div>
  );
};

export default ControlPanel;
