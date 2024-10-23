import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Speaker, SpeakerSchema } from './speaker.schema';
import { Attendee } from './attendee.schema';

@Schema()
export class Talk extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [SpeakerSchema], required: true })
  speakers: Speaker[];

  @Prop()
  description: string;

  @Prop({ default: [] })
  attendees: Attendee[];

  @Prop({ required: true })
  startTime: Date;
}

export const TalkSchema = SchemaFactory.createForClass(Talk);
