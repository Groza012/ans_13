import { Injectable } from '@nestjs/common';
import * as forge from 'node-forge';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EncryptService {
  private publicKey: forge.pki.rsa.PublicKey;
  private privateKey: forge.pki.rsa.PrivateKey;

  constructor() {
    const pubPem = fs.readFileSync(path.join(__dirname, '../../keys/public.pem'), 'utf8');
    const priPem = fs.readFileSync(path.join(__dirname, '../../keys/private.pem'), 'utf8');
    this.publicKey = forge.pki.publicKeyFromPem(pubPem) as forge.pki.rsa.PublicKey;
    this.privateKey = forge.pki.privateKeyFromPem(priPem) as forge.pki.rsa.PrivateKey;
  }

  encryptData(payload: string) {
    try {
      const encrypted1 = this.publicKey.encrypt(payload, 'RSA-OAEP');
      const encrypted2 = this.publicKey.encrypt(payload.split('').reverse().join(''), 'RSA-OAEP');

      return {
        successful: true,
        error_code: '',
        data: { data1: forge.util.encode64(encrypted1), data2: forge.util.encode64(encrypted2) },
      };
    } catch (err) {
      return { successful: false, error_code: 'ENCRYPT_ERROR', data: null };
    }
  }

  decryptData(data1: string, data2: string) {
    try {
      const decrypted = this.privateKey.decrypt(forge.util.decode64(data1), 'RSA-OAEP');
      return { successful: true, error_code: '', data: { payload: decrypted } };
    } catch (err) {
      return { successful: false, error_code: 'DECRYPT_ERROR', data: null };
    }
  }
}
