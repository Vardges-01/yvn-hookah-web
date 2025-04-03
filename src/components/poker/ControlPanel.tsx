import { useState } from 'react';
import io from 'socket.io-client';

const ControlPanel = () => {
  const [socketId, setSocketId] = useState('');
  const [socket, setSocket] = useState(null);

  const connectToTV = () => {
    const newSocket = io('http://localhost:3000'); // Замените на адрес вашего сервера
    setSocket(newSocket);
    alert('Подключение к телевизору...');
    newSocket.emit('connect-to-tv', socketId);
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', 'Hello from control panel!');
    }
  };

  const startTimer = () => {
    if (socket) {
        console.log('Starting timer...', socketId);
        socket.emit('startTimer', socketId);
      }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <input
        type="text"
        placeholder="Введите ID телевизора"
        value={socketId}
        onChange={(e) => setSocketId(e.target.value)}
      />
      <button onClick={connectToTV}>Подключиться</button>
      <button onClick={sendMessage}>Отправить сообщение</button>
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
};

export default ControlPanel;