import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinTalk')
  handleJoinTalk(
    @MessageBody() talkId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(talkId);
    this.server
      .to(talkId)
      .emit('message', `User ${client.id} joined talk ${talkId}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() payload: { talkId: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { talkId, message } = payload;
    this.server.to(talkId).emit('message', { sender: client.id, message });
  }

  @SubscribeMessage('leaveTalk')
  handleLeaveTalk(
    @MessageBody() talkId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(talkId);
    this.server
      .to(talkId)
      .emit('message', `User ${client.id} left talk ${talkId}`);
  }
}
