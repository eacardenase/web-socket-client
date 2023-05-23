import { Manager, Socket } from 'socket.io-client';

export const connectToServer = () => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

  const socket = manager.socket('/');

  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector('#server-status')!;
  const clientsUl = document.querySelector('#clients-ul')!;

  socket.on('connect', () => {
    serverStatusLabel.textContent = 'Online';
  });

  socket.on('disconnect', () => {
    serverStatusLabel.textContent = 'Offline';
  });

  socket.on('clients-updated', (clients: string[]) => {
    const clientsHTML = clients
      .map((clientId) => `<li>Client Id: ${clientId}</li>`)
      .join('');

    clientsUl.innerHTML = clientsHTML;
  });
};
