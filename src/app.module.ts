import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import keycloakConfiguration from './keycloakConfig/keycloak-configuration';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { PetsModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [keycloakConfiguration],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@crud-person.rm6bg.mongodb.net/?retryWrites=true&w=majority&appName=crud-person',
      {
        dbName: 'crud_pets',
      },
    ),

    PetsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
