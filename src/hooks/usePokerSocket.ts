// src/hooks/usePokerSocket.ts
import { useEffect } from 'react';
import useSocket from '../lib/socket';

interface UsePokerSocketOptions {
    onRoomCreated?: (roomId: string) => void;
    onTogglePlay?: () => void;
    onReset?: () => void;
    onPresetChanged?: (presetId: string) => void;
    onAdjustTime?: (delta: number) => void;
    onAdjustLevel?: (delta: number) => void;
}

export default function usePokerSocket(
    roomCode: string | null,
    options: UsePokerSocketOptions
) {
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (!socket) return;

        if (!roomCode) {
            socket.emit('createRoom')
        } else {
            socket.emit('joinRoom', roomCode);
        }


        if (!roomCode) {
            socket.on('roomCreated', (roomId: string) => {
                options.onRoomCreated?.(roomId);
            })

        }

        if (options.onTogglePlay && options.onReset) {
            socket.on('timerControl', (command: string) => {
                if (command === 'togglePlay') {
                    options.onTogglePlay?.();
                } else if (command === 'reset') {
                    options.onReset?.();
                }
            });
        }

        if (options.onPresetChanged) {
            socket.on('presetChanged', (presetId: string) => {
                options.onPresetChanged?.(presetId);
            });
        }
        
        if(options.onAdjustTime) {
            socket.on('adjustTime', (data: { room: string; time: number }) => {
                options.onAdjustTime?.(data.time);
            });
        }

        if(options.onAdjustLevel) {
            socket.on('adjustLevel', (data: { room: string; level: number }) => {
                options.onAdjustLevel?.(data.level);
            });
        }

        return () => {
            socket.off('timerControl');
            socket.off('presetChanged');
            socket.off('adjustTime');
            socket.off('adjustLevel');
        };
    }, [socket, roomCode]);

    return { socket, isConnected };
}