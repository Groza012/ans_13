// encrypt.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class EncryptDto {
  @ApiProperty({ type: String, required: true, maxLength: 2000 })
  payload: string;
}

export class DecryptDto {
  @ApiProperty({ type: String, required: true })
  data1: string;

  @ApiProperty({ type: String, required: true })
  data2: string;
}
