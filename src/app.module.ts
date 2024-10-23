import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TalkModule } from './talk/talk.module';
import { ChatGateway } from './gateway/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppService } from './app.service';

dotenv.config();

console.log(process.env.DATABASE_URL)
@Module({
  imports: [
    TalkModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [ChatGateway, AppService],
})
export class AppModule {}
