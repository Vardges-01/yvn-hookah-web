// src/components/poker/SettingsModal.tsx
import { useEffect, useState } from 'react';
import { X, Trash2, Plus, Coffee } from 'lucide-react';

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
  presetName: string;
  onSaveNewPreset: (name: string, levels: Level[]) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  levels,
  onUpdateLevels,
  presetName,
  onSaveNewPreset,
}: SettingsModalProps) {
  const [tempLevels, setTempLevels] = useState<Level[]>(levels);

  const [newPresetName, setNewPresetName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    setTempLevels(levels);
  }
    , [levels]);

  const updateLevel = (
    index: number,
    field: keyof Level,
    value: string | boolean
  ) => {
    const newLevels = [...tempLevels];
    newLevels[index] = {
      ...newLevels[index],
      [field]: typeof value === 'boolean' ? value : parseInt(value as string) || 0,
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

  const handleSave = () => {
    if (isCreatingNew && newPresetName.trim()) {
      onSaveNewPreset(newPresetName.trim(), tempLevels);
    } else {
      onUpdateLevels(tempLevels);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-lg lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold pr-2">
              {isCreatingNew ? 'Create New Preset' : `${presetName} - Blind Structure Settings`}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full flex-shrink-0">
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {isCreatingNew && (
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preset Name
              </label>
              <input
                type="text"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                className="w-full px-4 py-3 text-base sm:text-lg bg-gray-700 rounded text-white"
                placeholder="Enter preset name"
              />
            </div>
          )}

          <div className="space-y-3 sm:space-y-4">
            {tempLevels.map((level, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-3 sm:p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm sm:text-base font-medium text-white">
                    {level.isBreak ? 'Break' : `Level ${index + 1}`}
                  </span>
                  <div className="flex gap-1 sm:gap-2">
                    {!level.isBreak && (
                      <button
                        onClick={() => addBreak(index)}
                        className="p-2 hover:bg-gray-600 rounded-full"
                        title="Add break after this level"
                      >
                        <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => removeLevel(index)}
                      disabled={tempLevels.length <= 1}
                      className="p-2 hover:bg-gray-600 rounded-full disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {!level.isBreak ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-300 mb-1">Small Blind</label>
                      <input
                        type="number"
                        value={level.smallBlind}
                        onChange={(e) => updateLevel(index, 'smallBlind', e.target.value)}
                        className="w-full px-3 py-2 text-sm sm:text-base bg-gray-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-300 mb-1">Big Blind</label>
                      <input
                        type="number"
                        value={level.bigBlind}
                        onChange={(e) => updateLevel(index, 'bigBlind', e.target.value)}
                        className="w-full px-3 py-2 text-sm sm:text-base bg-gray-800 rounded text-white"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs sm:text-sm text-gray-300 mb-1">Duration (min)</label>
                      <input
                        type="number"
                        value={level.duration}
                        onChange={(e) => updateLevel(index, 'duration', e.target.value)}
                        className="w-full px-3 py-2 text-sm sm:text-base bg-gray-800 rounded text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-sm sm:text-base text-gray-300">
                    <Coffee className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    <span>Break Time</span>
                    <div className="ml-auto">
                      <label className="block text-xs sm:text-sm text-gray-300 mb-1">Duration (min)</label>
                      <input
                        type="number"
                        value={level.duration}
                        onChange={(e) => updateLevel(index, 'duration', e.target.value)}
                        className="w-20 px-3 py-2 text-sm sm:text-base bg-gray-800 rounded text-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={addLevel}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-base sm:text-lg font-medium"
              >
                <Plus className="w-5 h-5" /> Add Level
              </button>
              {!isCreatingNew && (
                <button
                  onClick={() => setIsCreatingNew(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-base sm:text-lg font-medium"
                >
                  <Plus className="w-5 h-5" /> Save as New
                </button>
              )}
            </div>
            <button
              onClick={handleSave}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-base sm:text-lg"
            >
              {isCreatingNew ? 'Create Preset' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
