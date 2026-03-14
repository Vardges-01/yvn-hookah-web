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
    <div className="flex-auto flex flex-col items-center justify-between w-full box-border font-sans">

      {/* Top Section: Level and Blinds in Row */}
      <div className="w-full flex gap-[8vw] justify-center items-center">
        {/* Level */}
        <div className="text-center">
          <div className="text-[1.5vw] text-gray-400 uppercase tracking-widest mb-[0.5vw] font-bold">Level</div>
          <div className="text-[6vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 leading-none">
            {currentLevel + 1}
          </div>
        </div>

        {/* Divider */}
        <div className="w-[0.3vw] h-[10vw] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50 rounded-full"></div>

        {/* Blinds */}
        <div className="text-center">
          <div className="text-[1.5vw] text-gray-400 uppercase tracking-widest mb-[0.5vw] font-bold">Blinds</div>
          <div className="text-[6vw] font-black leading-none">
            <span className="text-blue-400">{blinds?.smallBlind}</span>
            <span className="text-gray-500 text-[4vw] mx-[1.5vw]">/</span>
            <span className="text-emerald-400">{blinds?.bigBlind}</span>
          </div>
        </div>
      </div>

      {/* Main Timer Display - Centered and Fluid */}
      <div className={`w-[85vw] mx-auto rounded-[2.5vw] p-[3vw] flex flex-col items-center justify-center transition-colors duration-1000 ${getBackgroundClass()} ${getWarningClass()}`}>
        <div className="text-center w-full">
          <div className="text-white text-opacity-70 text-[2vw] uppercase tracking-widest mb-[1vw] font-black">Time</div>
          {/* tabular-nums prevents jitter when digits like 1 and 0 change */}
          <div
            className="text-[22vw] font-black text-white drop-shadow-2xl tabular-nums tracking-tighter"
            style={{ lineHeight: '0.85' }}
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Bottom Section: Previous and Next */}
      <div className="w-full flex justify-center gap-[6vw] py-[2vw]">
        {/* Previous */}
        <div className="text-center">
          <div className="text-[1.3vw] text-gray-500 uppercase tracking-widest mb-[0.5vw] font-bold">Previous</div>
          <div className={`text-[3.5vw] font-black px-[3.5vw] py-[1.5vw] rounded-[1.5vw] bg-gray-700 bg-opacity-40 border-[0.2vw] border-gray-600 min-w-[25vw] ${previousLevel === 'BREAK' ? 'text-yellow-300' : 'text-gray-300'
            }`}>
            {previousLevel || '—'}
          </div>
        </div>

        {/* Next */}
        <div className="text-center">
          <div className="text-[1.3vw] text-gray-500 uppercase tracking-widest mb-[0.5vw] font-bold">Next Level</div>
          <div className={`text-[3.5vw] font-black px-[3.5vw] py-[1.5vw] rounded-[1.5vw] bg-gray-700 bg-opacity-40 border-[0.2vw] border-gray-600 min-w-[25vw] ${nextLevel === 'BREAK' ? 'text-yellow-300' : nextLevel === 'FINAL' ? 'text-red-400' : 'text-gray-300'
            }`}>
            {nextLevel}
          </div>
        </div>
      </div>

    </div>
  );
}
