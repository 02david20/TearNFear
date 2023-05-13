import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  dob?: Date;

  @Prop()
  gender?: Date;

  @Prop()
  phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);