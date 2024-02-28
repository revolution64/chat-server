import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketService } from './websocket/websocket.service';
import {SocketModule} from "./websocket/websocket.module";

@Module({
  imports: [SocketModule],
  controllers: [AppController],
  providers: [AppService, WebSocketService],
})
export class AppModule {}
