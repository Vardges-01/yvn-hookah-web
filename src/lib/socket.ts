import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io(SOCKET_URL); // Адрес вашего сервера

    socketConnection.on('connect', () => {
      console.log('Connected to server');
      console.log('Socket ID:', socketConnection.id); // Выводим ID сокета
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.close();
    };
  }, []);

  return socket;
};

export default useSocket;
