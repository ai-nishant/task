import { Module } from '@nestjs/common';
import { SessionmanagerService } from './service/sessionmanager/sessionmanager.service';

@Module({
  providers: [SessionmanagerService]
})
export class SessionmanagerModule {}
