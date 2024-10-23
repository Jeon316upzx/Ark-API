import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Speaker extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  bio: string;
}

export const SpeakerSchema = SchemaFactory.createForClass(Speaker);
