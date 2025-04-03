import { Play, Pause, RotateCcw, Settings, Tv } from 'lucide-react';

interface HeaderProps {
    isRunning: boolean;
    onTogglePlay: () => void;
    onReset: () => void;
    onOpenSettings: () => void;
    onTvConnect: () => void;
}

export function Header({
    isRunning,
    onTogglePlay,
    onReset,
    onOpenSettings,
    onTvConnect,
}: HeaderProps) {
    return (
        <div className="bg-gray-800 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Weekly Poker Game</h1>
            <div className="flex gap-4">
                <button
                    onClick={onTvConnect}>
                    <Tv className="w-6 h-6" />
                </button>
                <button
                    onClick={onTogglePlay}
                    className="p-2 hover:bg-gray-600 rounded-lg"
                >
                    {isRunning ? (
                        <Pause className="w-6 h-6" />
                    ) : (
                        <Play className="w-6 h-6" />
                    )}
                </button>
                <button onClick={onReset} className="p-2 hover:bg-gray-600 rounded-lg">
                    <RotateCcw className="w-6 h-6" />
                </button>
                <button
                    onClick={onOpenSettings}
                    disabled={isRunning}
                    className="p-2 hover:bg-gray-600 rounded-lg disabled:opacity-50"
                >
                    <Settings className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
