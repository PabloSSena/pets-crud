import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  typeOfAnimal: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
