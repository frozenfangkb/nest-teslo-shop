import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClient {
  [id: string]: Socket;
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClient = {};

  registerClient(client: Socket) {
    const id = client.id;
    this.connectedClients[id] = client;
  }

  removeClient(client: Socket) {
    const id = client.id;
    delete this.connectedClients[id];
  }

  getConnectedClients(): number {
    return Object.keys(this.connectedClients).length;
  }
}
