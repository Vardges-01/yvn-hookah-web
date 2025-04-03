import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import io from 'socket.io-client';

const TVConnect = ({ isOpen, onClose, onStartTimer }) => {
    const [socket, setSocket] = useState(null);
    const [qrCodeValue, setQRCodeValue] = useState('');

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        console.log(socket)

        newSocket.on('connect', () => {
            setQRCodeValue(newSocket.id);
            console.log(`Connected: ${newSocket.id}`);
        });

        newSocket.on('message', (message) => {
            console.log(newSocket)
            alert(`Message from ${newSocket?.id}: ${message}`);
        });

        newSocket.on('startTimer', ()=>{
            console.log('Start timer event received');
            onStartTimer()
        })

        return () => {
            newSocket.disconnect();
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
            <button
                className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded"
                onClick={onClose}
            >
                Закрыть
            </button>
            <p>Отсканируйте QR-код для подключения</p>
            {qrCodeValue && <QRCodeSVG value={qrCodeValue} />}
        </div>
    );
};

export default TVConnect;