// src/components/poker/ControllerSetup.tsx
import { useState } from 'react';
import { Smartphone, Tv, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ControllerSetup() {
    const [mode, setMode] = useState<'display' | 'controller' | null>(null);
    const [connectionCode, setConnectionCode] = useState('');
    const navigate = useNavigate();

    const handleStart = (modeName) => {
        if (modeName) {
            setMode(modeName);
            if (modeName === 'controller') {
                // Show code input screen for controller
                setConnectionCode('');
            } else {
                // Navigate directly for display
                navigate(`/poker/display`);
            }
        }
    };

    const handleConnect = () => {
        if (connectionCode.trim()) {
            navigate(`/poker/controller?code=${connectionCode.trim()}`);
        }
    };

    const handleGoBack = () => {
        setMode(null);
        setConnectionCode('');
    };

    if (!mode) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold mb-8 text-center">Choose Mode</h1>
                    <div className="flex gap-6">
                        <button
                            onClick={() => handleStart('display')}
                            className="flex flex-col items-center gap-4 p-6 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                        >
                            <Tv className="w-12 h-12" />
                            <span className="text-lg">Display (TV)</span>
                        </button>
                        <button
                            onClick={() => handleStart('controller')}
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

    if (mode === 'controller') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-8">Connect to Display</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Enter Connection Code
                                </label>
                                <input
                                    type="text"
                                    value={connectionCode}
                                    onChange={(e) => setConnectionCode(e.target.value.replace(/[^0-9]/g, ''))}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleConnect();
                                        }
                                    }}
                                    placeholder="e.g., 123456"
                                    className="w-full px-4 py-3 bg-gray-700 text-white text-center text-lg font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                    maxLength={10}
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={handleConnect}
                                disabled={!connectionCode.trim()}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6 capitalize">{mode} Setup</h2>
                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <p className="text-gray-400 mb-6">Initializing display...</p>
                </div>
            </div>
        </div>
    );
}
