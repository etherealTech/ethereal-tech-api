import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
export declare class AuthService {
    private readonly _auth;
    verifyIdToken(req: any): Promise<boolean>;
    getDecodeToken(token: string): Promise<DecodedIdToken>;
}
