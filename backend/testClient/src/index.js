import Websocket from 'ws';

const ws = new Websocket('ws://localhost:8001/live');

ws.on('open', () => {
  console.log('Connected to server');
  const hello = Buffer.from('Hello from client'); 
  ws.send(hello);
});