import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@crud-person.rm6bg.mongodb.net/?retryWrites=true&w=majority&appName=crud-person',
    ),
    PetsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
