import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

const credentials = `${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}`;
const host = process.env.MONGO_DB_HOST;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${credentials}@${host}/?authSource=admin&ssl=false`),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
