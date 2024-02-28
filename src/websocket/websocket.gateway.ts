// src/websocket.gateway.ts
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';

const CHAT_ROOM_NAME = "CHAT123";
@WebSocketGateway()
export class SocketGateway {

    private clientIdToUsername: {};

    constructor() {
        this.clientIdToUsername = {};
    }

    @WebSocketServer() server: Server;

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() username: string): void {
        client.join(CHAT_ROOM_NAME); // Join the specified room
        this.clientIdToUsername[client.id] = username;
        console.log(`Client ${client.id} with username ${username} joined room ${CHAT_ROOM_NAME}`);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() username: string): void {
        client.leave(CHAT_ROOM_NAME); // Leave the specified room
        console.log(`Client ${client.id} with username ${username} joined room ${CHAT_ROOM_NAME}`);
    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
        const senderUsername = this.clientIdToUsername[client.id];
        console.log(`Client ${client.id} with username ${this.clientIdToUsername[client.id]} sent payload ${payload}`);
        client.to(CHAT_ROOM_NAME).emit('message', { username: senderUsername, message: payload});
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        return data;
    }
}