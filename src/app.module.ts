import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { LogsModule } from './modules/logs/logs.module';
import { User } from './modules/user/model/user';
import { Logs } from './modules/logs/model/otplog';
const envConfig = dotenv.config().parsed;
@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
   type:'mysql',
   host:'localhost',
   database:'test',
   port:3306,
   username:'root',
   password:'root',
   entities:[User,Logs],
   synchronize: true,
   logging:false
  }), UserModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
