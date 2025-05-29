import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
    this.messagesWsService.removeClient(client);
  }

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
    this.messagesWsService.registerClient(client);
    console.log(
      'Connected clients',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log('Message received', payload);
    client.broadcast.emit('message', payload);
  }
}
