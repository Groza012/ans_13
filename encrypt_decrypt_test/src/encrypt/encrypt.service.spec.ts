import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let service: EncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    service = module.get<EncryptService>(EncryptService);
  });

  it('should encrypt and decrypt correctly', () => {
    const payload = 'Hello NestJS';
    const encrypted = service.encryptData(payload);
    expect(encrypted.successful).toBe(true);

    const decrypted = service.decryptData(encrypted.data.data1, encrypted.data.data2);
    expect(decrypted.successful).toBe(true);
    expect(decrypted.data.payload).toBe(payload);
  });
});
