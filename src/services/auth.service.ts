import { Global, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Global()
@Injectable()
export class AuthService {
  private readonly _auth = auth();

  async verifyIdToken(req: any) {
    let token: string | undefined = req.headers['authorization'];
    if (!token) {
      throw new Error('Missing authroizaiton token in header field');
    }
    req.query.token = token.slice(7);
    await this._auth.verifyIdToken(req.query.token);
    return true;
  }

  getDecodeToken(token: string): Promise<DecodedIdToken> {
    return this._auth.verifyIdToken(token);
  }
}
