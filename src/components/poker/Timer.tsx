interface TimerProps {
    timeLeft: number;
    currentLevel: number;
    blinds: { smallBlind: number; bigBlind: number };
    previousLevel: string;
    nextLevel: string;
  }
  
  export function Timer({
    timeLeft,
    currentLevel,
    blinds,
    previousLevel,
    nextLevel,
  }: TimerProps) {
    const formatTime = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
    };
  
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="text-[12rem] font-bold leading-none tracking-wider text-shadow-lg">
          {formatTime(timeLeft)}
        </div>
  
        <div className="text-4xl mt-8">Level {currentLevel + 1}</div>
  
        <div className="text-8xl font-bold mt-8">
          {blinds.smallBlind} / {blinds.bigBlind}
        </div>
  
        <div className="w-full max-w-2xl mt-12 flex justify-between text-2xl text-gray-300">
          <div>
            <div className="text-lg">Previous</div>
            {previousLevel}
          </div>
          <div>
            <div className="text-lg">Next</div>
            {nextLevel}
          </div>
        </div>
      </div>
    );
  }
  