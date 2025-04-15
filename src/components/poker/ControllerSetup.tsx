// src/components/poker/ControllerSetup.tsx
import { useState } from 'react';
import { Smartphone, Tv } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ControllerSetup() {
    const [mode, setMode] = useState<'display' | 'controller' | null>(null);
    const navigate = useNavigate();

    const handleStart = (modeName) => {
        if (modeName) {
            setMode(modeName);
            navigate(`/poker/${modeName}`);
        }
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6 capitalize">{mode} Setup</h2>
                    <button
                        onClick={handleStart}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
                    >
                        Generate Code and Start
                    </button>
                </div>
            </div>
        </div>
    );
}
