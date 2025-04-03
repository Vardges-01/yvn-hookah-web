import { useState, useEffect } from 'react';
import { Header } from '../../components/poker/Header';
import { Timer } from '../../components/poker/Timer';
import { SettingsModal } from '../../components/poker/SettingsModal';
import TVConnect from '../../components/poker/TvConnect';

interface Level {
    smallBlind: number;
    bigBlind: number;
    duration: number;
    isBreak?: boolean;
}

function PokerTimer() {
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

    const [currentLevel, setCurrentLevel] = useState(0);
    const [timeLeft, setTimeLeft] = useState(levels[0].duration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        let interval: any | undefined;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
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

    const handleReset = () => {
        setIsRunning(false);
        setCurrentLevel(0);
        setTimeLeft(levels[0].duration * 60);
    };

    const getPreviousLevel = () => {
        if (currentLevel > 0) {
            const prev = levels[currentLevel - 1];
            return prev.isBreak ? 'BREAK' : `${prev.smallBlind} / ${prev.bigBlind}`;
        }
        return '';
    };

    const getNextLevel = () => {
        if (currentLevel < levels.length - 1) {
            const next = levels[currentLevel + 1];
            return next.isBreak ? 'BREAK' : `${next.smallBlind} / ${next.bigBlind}`;
        }
        return 'FINAL';
    };

    const handleUpdateLevels = (newLevels: Level[]) => {
        setLevels(newLevels);
        setTimeLeft(newLevels[currentLevel].duration * 60);
    };

    const [isTvConnectOpen, setIsTvConnectOpen] = useState(false);

    const handleTvConnect = () => {
        setIsTvConnectOpen(!isTvConnectOpen);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
            <Header
                isRunning={isRunning}
                onTogglePlay={() => setIsRunning(!isRunning)}
                onReset={handleReset}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onTvConnect={handleTvConnect}
            />

            <Timer
                timeLeft={timeLeft}
                currentLevel={currentLevel}
                blinds={levels[currentLevel]}
                previousLevel={getPreviousLevel()}
                nextLevel={getNextLevel()}
            />

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                levels={levels}
                onUpdateLevels={handleUpdateLevels}
            />

            <TVConnect isOpen={isTvConnectOpen} onClose={handleTvConnect} onStartTimer={() =>{console.log(isRunning); setIsRunning(!isRunning)}}/>
        </div>
    );
}

export default PokerTimer;
