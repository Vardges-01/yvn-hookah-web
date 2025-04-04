import { useState } from 'react';
import { Smartphone, Tv } from 'lucide-react';

interface ControllerSetupProps {
  onSetup: (code: string) => void;
}

export function ControllerSetup({ onSetup }: ControllerSetupProps) {
  const [mode, setMode] = useState<'display' | 'controller' | null>(null);
  const [code, setCode] = useState('');

  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    onSetup(newCode);

    // Update URL without reloading
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'display');
    url.searchParams.set('code', newCode);
    window.history.pushState({}, '', url.toString());
  };

  const handleJoinAsController = () => {
    if (code.length >= 6) {
      onSetup(code);

      // Update URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.set('mode', 'controller');
      url.searchParams.set('code', code);
      window.history.pushState({}, '', url.toString());
    }
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold mb-8 text-center">Choose Mode</h1>
          <div className="flex gap-6">
            <button
              onClick={() => setMode('display')}
              className="flex flex-col items-center gap-4 p-6 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <Tv className="w-12 h-12" />
              <span className="text-lg">Display (TV)</span>
            </button>
            <button
              onClick={() => setMode('controller')}
              className="flex flex-col items-center gap-4 p-6 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <Smartphone className="w-12 h-12" />
              <span className="text-lg">Controller (Phone)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        {mode === 'display' ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Display Setup</h2>
            <button
              onClick={generateCode}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
            >
              Generate Connection Code
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Enter Display Code</h2>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg mb-4 text-center text-2xl tracking-wider"
              maxLength={6}
            />
            <button
              onClick={handleJoinAsController}
              disabled={code.length < 6}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold w-full disabled:opacity-50"
            >
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
