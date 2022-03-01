import { Test, TestingModule } from '@nestjs/testing';
import { SessionmanagerService } from './sessionmanager.service';

describe('SessionmanagerService', () => {
  let service: SessionmanagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionmanagerService],
    }).compile();

    service = module.get<SessionmanagerService>(SessionmanagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
