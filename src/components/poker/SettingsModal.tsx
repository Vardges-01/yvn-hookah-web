import { X, Trash2, Plus, Coffee } from 'lucide-react';
import { useState } from 'react';

interface Level {
  smallBlind: number;
  bigBlind: number;
  duration: number;
  isBreak?: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  levels: Level[];
  onUpdateLevels: (levels: Level[]) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  levels,
  onUpdateLevels,
}: SettingsModalProps) {
  const [tempLevels, setTempLevels] = useState<Level[]>(levels);

  const updateLevel = (
    index: number,
    field: keyof Level,
    value: string | boolean
  ) => {
    const newLevels = [...tempLevels];
    newLevels[index] = {
      ...newLevels[index],
      [field]:
        typeof value === 'boolean' ? value : parseInt(value as string) || 0,
    };
    setTempLevels(newLevels);
  };

  const addLevel = () => {
    const lastLevel = tempLevels[tempLevels.length - 1];
    const newLevel = {
      smallBlind: lastLevel.smallBlind * 2,
      bigBlind: lastLevel.bigBlind * 2,
      duration: lastLevel.duration,
      isBreak: false,
    };
    setTempLevels([...tempLevels, newLevel]);
  };

  const addBreak = (index: number) => {
    const newLevels = [...tempLevels];
    newLevels.splice(index + 1, 0, {
      smallBlind: 0,
      bigBlind: 0,
      duration: 10,
      isBreak: true,
    });
    setTempLevels(newLevels);
  };

  const removeLevel = (index: number) => {
    if (tempLevels.length > 1) {
      const newLevels = tempLevels.filter((_, i) => i !== index);
      setTempLevels(newLevels);
    }
  };

  const saveSettings = () => {
    onUpdateLevels(tempLevels);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Blind Structure Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {tempLevels.map((level, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg"
            >
              <span className="text-sm font-medium w-16">
                {level.isBreak ? 'Break' : `Level ${index + 1}`}
              </span>
              <div className="flex-1 grid grid-cols-3 gap-4">
                {!level.isBreak ? (
                  <>
                    <div>
                      <label className="text-sm text-gray-300">
                        Small Blind
                      </label>
                      <input
                        type="number"
                        value={level.smallBlind}
                        onChange={(e) =>
                          updateLevel(index, 'smallBlind', e.target.value)
                        }
                        className="w-full px-3 py-2 bg-gray-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">Big Blind</label>
                      <input
                        type="number"
                        value={level.bigBlind}
                        onChange={(e) =>
                          updateLevel(index, 'bigBlind', e.target.value)
                        }
                        className="w-full px-3 py-2 bg-gray-800 rounded text-white"
                      />
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 flex items-center">
                    <Coffee className="w-6 h-6 mr-2" />
                    <span>Break Time</span>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-300">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={level.duration}
                    onChange={(e) =>
                      updateLevel(index, 'duration', e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-800 rounded text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {!level.isBreak && (
                  <button
                    onClick={() => addBreak(index)}
                    className="p-2 hover:bg-gray-600 rounded-full"
                    title="Add break after this level"
                  >
                    <Coffee className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => removeLevel(index)}
                  disabled={tempLevels.length <= 1}
                  className="p-2 hover:bg-gray-600 rounded-full disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={addLevel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            <Plus className="w-5 h-5" /> Add Level
          </button>
          <button
            onClick={saveSettings}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
