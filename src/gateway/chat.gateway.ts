import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',  // Adjust this for security in production
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // When a client joins a talk room (based on talkId)
  @SubscribeMessage('joinTalk')
  handleJoinTalk(@MessageBody() talkId: string, @ConnectedSocket() client: Socket): void {
    client.join(talkId);
    this.server.to(talkId).emit('message', `User ${client.id} joined talk ${talkId}`);
  }

  // When a client sends a message in the talk room
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() payload: { talkId: string, message: string },
    @ConnectedSocket() client: Socket
  ): void {
    const { talkId, message } = payload;
    this.server.to(talkId).emit('message', { sender: client.id, message });
  }

  // When a client leaves the talk room
  @SubscribeMessage('leaveTalk')
  handleLeaveTalk(@MessageBody() talkId: string, @ConnectedSocket() client: Socket): void {
    client.leave(talkId);
    this.server.to(talkId).emit('message', `User ${client.id} left talk ${talkId}`);
  }
}
