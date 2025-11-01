import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncryptService } from './encrypt.service';
import { EncryptDto, DecryptDto } from '../common/dto/encrypt.dto';

@ApiTags('encrypt')
@Controller()
export class EncryptController {
  constructor(private readonly encryptService: EncryptService) {}

  @Post('get-encrypt-data')
  encrypt(@Body() body: EncryptDto) {
    return this.encryptService.encryptData(body.payload);
  }

  @Post('get-decrypt-data')
  decrypt(@Body() body: DecryptDto) {
    return this.encryptService.decryptData(body.data1, body.data2);
  }
}
