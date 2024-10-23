import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Talk, TalkSchema } from './schema/talk.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Talk.name,
        schema: TalkSchema,
      },
    ]),
  ],
  providers: [TalkService],
  controllers: [TalkController],
})
export class TalkModule {}
