import { Module } from '@nestjs/common';
import { SocketGateway } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Module({
    providers: [SocketGateway],
})
export class SocketModule {}