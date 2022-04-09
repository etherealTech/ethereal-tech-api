import { Global, Injectable } from '@nestjs/common';
import { APP_SECRET } from 'src/app.config';
import Cryptr from 'cryptr';

@Global()
@Injectable()
export class CryptService {
  private readonly _crypt = new Cryptr(APP_SECRET);

  encrypt(text: string) {
    return this._crypt.encrypt(text);
  }

  decrypt(encrypted: string) {
    return this._crypt.decrypt(encrypted);
  }
}
