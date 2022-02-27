import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from '../logs/logs.module';
import { User } from './model/user';
import { UserService } from './service/user/user.service';

@Module({
  imports:[LogsModule,TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
