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

    const getWarningClass = () => {
      if (timeLeft <= 60) return 'animate-pulse';
      return '';
    };

    const getBackgroundClass = () => {
      if (timeLeft <= 60) return 'bg-red-600 shadow-red-500/50';
      if (timeLeft <= 300) return 'bg-orange-600 shadow-orange-500/50';
      return 'bg-gray-800';
    };
  
    return (
      <div className="flex-1 flex flex-col items-center justify-between p-2">
        {/* Top Section: Level and Blinds in Row */}
        <div className="w-full flex gap-16 justify-center mb-6">
          {/* Level */}
          <div className="text-center">
            <div className="text-2xl text-gray-400 uppercase tracking-widest mb-2 font-bold">Level</div>
            <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">
              {currentLevel + 1}
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-2 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50"></div>

          {/* Blinds */}
          <div className="text-center">
            <div className="text-2xl text-gray-400 uppercase tracking-widest mb-2 font-bold">Blinds</div>
            <div className="text-7xl font-black">
              <span className="text-blue-400">{blinds.smallBlind}</span>
              <span className="text-gray-500 text-6xl mx-4">/</span>
              <span className="text-emerald-400">{blinds.bigBlind}</span>
            </div>
          </div>
        </div>

        {/* Main Timer Display - Centered and Massive */}
        <div className={`w-full max-w-5xl mx-auto rounded-3xl p-16 shadow-2xl ${getBackgroundClass()} ${getWarningClass()}`}>
          <div className="text-center">
            <div className="text-white text-opacity-70 text-4xl uppercase tracking-widest mb-6 font-black">Time</div>
            <div className="text-[20rem] font-black leading-none text-white drop-shadow-2xl" style={{lineHeight: '1'}}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Bottom Section: Previous and Next */}
        <div className="w-full flex gap-20 justify-center mt-6">
          {/* Previous */}
          <div className="text-center">
            <div className="text-xl text-gray-500 uppercase tracking-widest mb-4 font-bold">Previous</div>
            <div className={`text-5xl font-black px-8 py-4 rounded-2xl bg-gray-700 bg-opacity-40 border-2 border-gray-600 min-w-64 ${
              previousLevel === 'BREAK' ? 'text-yellow-300' : 'text-gray-300'
            }`}>
              {previousLevel || '—'}
            </div>
          </div>

          {/* Next */}
          <div className="text-center">
            <div className="text-xl text-gray-500 uppercase tracking-widest mb-4 font-bold">Next Level</div>
            <div className={`text-5xl font-black px-8 py-4 rounded-2xl bg-gray-700 bg-opacity-40 border-2 border-gray-600 min-w-64 ${
              nextLevel === 'BREAK' ? 'text-yellow-300' : nextLevel === 'FINAL' ? 'text-red-400' : 'text-gray-300'
            }`}>
              {nextLevel}
            </div>
          </div>
        </div>
      </div>
    );
  }
  