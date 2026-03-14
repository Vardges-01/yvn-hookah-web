import { Play, Pause, RotateCcw, Settings, Smartphone } from "lucide-react";
// import { QRCodeSVG } from "qrcode.react";

interface HeaderProps {
  isRunning: boolean;
  selectedPreset: any;
  onTogglePlay: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
  controllerCode: string;
  isController: boolean;
  showQR: boolean;
  setShowQR: (show: any) => void;
}

export function Header({
  isRunning,
  selectedPreset,
  onTogglePlay,
  onReset,
  onOpenSettings,
  controllerCode,
  isController,
  showQR,
  setShowQR,
}: HeaderProps) {
  const currentUrl = window.location.origin;

  return (
    <div className="bg-gradient-to-r from-black via-blue-950 to-black flex items-center gap-[2vw] border-b border-blue-800 shadow-lg relative z-20 px-[2vw]">
      {/* Left side - Logo */}
      <div className="flex items-center gap-[1.5vw] flex-1">
        <img
          src="/poker-logo.png"
          alt="Yerevan Poker Tournament"
          className="h-[5vmin] sm:block"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as any).nextSibling.style.display = 'flex';
          }}
        />
        <span className="text-[2.5vmin] hidden sm:block text-white uppercase tracking-widest font-black">
          Poker Tournament
        </span>
      </div>

      {/* Center - Tournament Name */}
      <div className="flex-1 text-center">
        <div className="text-[1.5vmin] text-gray-400 uppercase tracking-widest font-bold">
          Tournament
        </div>
        <div className="text-[2.5vmin] font-black text-white">
          {selectedPreset?.name || 'Loading...'}
        </div>
      </div>

      {/* Right side - Controls */}
      {isController && (
        <div className="flex gap-[1vw] items-center flex-1 justify-end">
          <span className="text-[2vmin] content-center bg-gradient-to-r from-blue-600 to-blue-700 px-[1.5vw] py-[0.8vh] rounded-[0.5vw] font-bold text-white shadow-lg">
            Code: {controllerCode}
          </span>
          <button
            onClick={onOpenSettings}
            disabled={isRunning}
            className="p-[1vmin] hover:bg-blue-700 hover:shadow-lg rounded-[0.5vw] disabled:opacity-50 transition-all duration-200 text-blue-300 hover:text-white"
          >
            <Settings className="w-[3vmin] h-[3vmin]" />
          </button>
        </div>
      )}

      {!isController && (
        <div className="flex gap-[1vw] items-center flex-1 justify-end flex-nowrap">
          <span className="text-[2vmin] content-center bg-gradient-to-r from-blue-600 to-blue-700 px-[1.5vw] py-[0.8vh] rounded-[0.5vw] font-bold text-white shadow-lg">
            Code: {controllerCode}
          </span>
          <button
            onClick={() => setShowQR((prev: any) => !prev)}
            className="flex items-center gap-[0.5vw] p-[1vmin] hover:bg-blue-700 hover:shadow-lg rounded-[0.5vw] transition-all duration-200 text-blue-300 hover:text-white"
            title="Control from phone"
          >
            <Smartphone className="w-[3vmin] h-[3vmin]" />
            <div className="text-[1.5vmin] font-semibold hidden md:block">QR</div>
          </button>
          <button
            onClick={onOpenSettings}
            disabled={isRunning}
            className="p-[1vmin] hover:bg-blue-700 hover:shadow-lg rounded-[0.5vw] disabled:opacity-50 transition-all duration-200 text-blue-300 hover:text-white"
          >
            <Settings className="w-[3vmin] h-[3vmin]" />
          </button>
          <button
            onClick={onTogglePlay}
            className="p-[1vmin] hover:bg-blue-700 hover:shadow-lg rounded-[0.5vw] transition-all duration-200 text-emerald-400 hover:text-emerald-300"
          >
            {isRunning ? (
              <Pause className="w-[3vmin] h-[3vmin]" />
            ) : (
              <Play className="w-[3vmin] h-[3vmin]" />
            )}
          </button>
          <button
            onClick={onReset}
            className="p-[1vmin] hover:bg-blue-700 hover:shadow-lg rounded-[0.5vw] transition-all duration-200 text-red-400 hover:text-red-300"
          >
            <RotateCcw className="w-[3vmin] h-[3vmin]" />
          </button>
        </div>
      )}

      {showQR && (
        <div
          onClick={() => setShowQR((prev: any) => !prev)}
          className="bg-slate-900 bg-opacity-80 fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
        >
          <div
            className="flex flex-col bg-white p-[3vmin] rounded-[1vw] shadow-2xl text-center items-center gap-[2vmin]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-black text-[2.5vmin] font-semibold">
              Scan to control
            </div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl + `/poker/controller/?code=${controllerCode}`)}`}
              alt="QR Code"
              style={{ width: '20vmin', height: '20vmin' }}
              className="rounded-lg"
            />
            <div className="text-black text-[3vmin] font-bold">
              CODE: {controllerCode}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
