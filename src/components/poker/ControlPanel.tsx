import { Pause, Play, RotateCcw } from "lucide-react";

interface ControlPanelProps {
  isRunning: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  blinds: { smallBlind: number; bigBlind: number };
  currentLevel: number;
}

const ControlPanel = ({
  isRunning,
  onTogglePlay,
  onReset,
  blinds,
  currentLevel,
}: ControlPanelProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
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