import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('Connecting to socket server:', SOCKET_URL);
    const socketConnection = io(SOCKET_URL, {
      path: '/api/socket.io',
      transports: ["polling",'websocket'],
      withCredentials: true,
    });

    socketConnection.on('connect', () => {
      console.log('✅ Connected to server');
      console.log('Socket ID:', socketConnection.id);
      setIsConnected(true);
    });

    socketConnection.on('connect_error', (error) => {
      console.error('❌ Connection error:', error);
      setIsConnected(false);
    });

    socketConnection.on('disconnect', (reason) => {
      console.log('❌ Disconnected:', reason);
      setIsConnected(false);
    });

    setSocket(socketConnection);

    return () => {
      console.log('Closing socket connection');
      socketConnection.close();
    };
  }, []);

  return { socket, isConnected };
};

export default useSocket;