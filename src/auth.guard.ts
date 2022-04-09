import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    return this.auth
      .verifyIdToken(context.switchToHttp().getRequest())
      .catch(() => false);
  }
}
