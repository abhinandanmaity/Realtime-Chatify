// import { Server } from 'ws';
import WebSocket from 'ws';

export default function handler(req, res) {
    const wss = new WebSocket.Server({ noServer: true });
  
    wss.on('connection', (ws) => {
      console.log('WebSocket client connected');
  
      ws.on('message', (message) => {
        console.log('Received message:', message);
  
        // Broadcast the received message to all clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });
    });
  
    // Upgrade the HTTP request to a WebSocket connection
    if (!res.socket.server.wss) {
      res.socket.server.wss = wss;
    }
  
    res.end();
  }