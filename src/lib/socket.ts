// useSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io('https://2d67-91-103-58-119.ngrok-free.app'); // Адрес вашего сервера

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
