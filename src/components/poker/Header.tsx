import { Play, Pause, RotateCcw, Settings, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface HeaderProps {
  isRunning: boolean;
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
    <div className="bg-gray-800 p-4 flex justify-between items-center">
        <img
          src="https://dev.yvnhookah.am/yvn-logo.svg"
          alt="YVN Lounge"
          className="h-12 md:h-12 hover:scale-105 transition-transform"
        />
      {isController && (
        <div className="flex gap-4">
          <span className="text-sm content-center bg-gray-700 px-3 py-1 rounded">
            Code: {controllerCode}
          </span>
          <button
            onClick={onOpenSettings}
            disabled={isRunning}
            className="p-2 hover:bg-gray-600 rounded-lg disabled:opacity-50"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      )}
      {!isController && (
        <div className="flex gap-4">
          <span className="text-sm content-center bg-gray-700 px-3 py-1 rounded">
            Code: {controllerCode}
          </span>
          <button
            onClick={() => setShowQR((prev) => !prev)}
            className="flex p-2 gap-2 hover:bg-gray-600 rounded-lg"
            title="Control from phone"
          >
            <Smartphone className="w-6 h-6" />
            <div>Connect Phone</div>
          </button>
          <button
            onClick={onOpenSettings}
            disabled={isRunning}
            className="p-2 hover:bg-gray-600 rounded-lg disabled:opacity-50"
          >
            <Settings className="w-6 h-6" />
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
          <button
            onClick={onReset}
            className="p-2 hover:bg-gray-600 rounded-lg"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      )}
      {showQR && (
        <div
          onClick={() => setShowQR((prev) => !prev)}
          className=" bg-slate-900 bg-opacity-80 fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg text-center items-center gap-3">
            <div className="text-black text-lg mb-2">
              Scan to control from phone
            </div>
            <QRCodeSVG
              value={
                currentUrl + `/poker/?mode=controller&code=${controllerCode}`
              }
              size={200}
            />
            <div className="text-black text-lg mb-2">
              CODE: {controllerCode}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
