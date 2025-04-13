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
}: ControlPanelProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
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
      <button
        onClick={onTogglePlay}
        className="w-48 h-48 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-colors"
      >
        {isRunning ? (
          <Pause className="w-24 h-24" />
        ) : (
          <Play className="w-24 h-24" />
        )}
      </button>

      <button
        onClick={onReset}
        className="w-24 h-24 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transition-colors"
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