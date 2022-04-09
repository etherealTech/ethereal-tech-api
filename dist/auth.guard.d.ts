import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './services/auth.service';
export declare class AuthGuard implements CanActivate {
    private readonly auth;
    constructor(auth: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
