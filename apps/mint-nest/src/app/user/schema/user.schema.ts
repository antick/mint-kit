import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
    userId: string;

  @Prop()
    email: string;

  @Prop()
    age: number;

  @Prop([String])
    favoriteFood: string[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
