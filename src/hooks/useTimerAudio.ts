// src/hooks/useTimerAudio.ts
import { useRef, useEffect } from 'react';

export default function useTimerAudio() {
  const tickAudio = useRef<HTMLAudioElement | null>(null);
  const gongAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    tickAudio.current = new Audio('/tiktak.mp3');
    tickAudio.current.volume = 1;
    gongAudio.current = new Audio('/gong.mp3');
    gongAudio.current.volume = 0.5;
  }, []);

  return { tickAudio, gongAudio };
}
