// src/api/WebSocketApi.js
let ws = null;
let wsPort= 'ws://localhost:8000/ws';
export const connectWebSocket = (onMessage) => {
    ws = new WebSocket(wsPort);

    // 연결
    ws.onopen = () => {
        console.log('웹소켓 연결됨');
    };

    // 메시지 송신
    ws.onmessage = (event) => {
        const kpi = JSON.parse(event.data);
        onMessage(kpi);
    };

    // 재연결
    ws.onclose = () => {
        console.log('웹소켓 끊김, 3초 후 재연결');
        setTimeout(() => connectWebSocket(onMessage), 3000);
    };

    // 에러
    ws.onerror = (error) => {
        console.error('웹소켓 에러', error);
    };
};

export const disconnectWebSocket = () => {
    if (ws) {
        ws.close();
    }
};