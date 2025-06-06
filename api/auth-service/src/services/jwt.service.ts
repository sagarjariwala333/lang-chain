import jwt from 'jsonwebtoken';
import NodeRSA from 'node-rsa';
import fs from 'fs';
import path from 'path';

export class JwtService {
  private privateKey!: string;
  private publicKey!: string;
  private readonly keyPath = path.join(__dirname, '../../keys');

  constructor() {
    this.initializeKeys();
  }

  private initializeKeys(): void {
    // Create keys directory if it doesn't exist
    if (!fs.existsSync(this.keyPath)) {
      fs.mkdirSync(this.keyPath, { recursive: true });
    }

    const privateKeyPath = path.join(this.keyPath, 'private.key');
    const publicKeyPath = path.join(this.keyPath, 'public.key');

    // Generate new RSA keys if they don't exist
    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
      const key = new NodeRSA({ b: 2048 });
      this.privateKey = key.exportKey('private');
      this.publicKey = key.exportKey('public');

      fs.writeFileSync(privateKeyPath, this.privateKey);
      fs.writeFileSync(publicKeyPath, this.publicKey);
    } else {
      this.privateKey = fs.readFileSync(privateKeyPath, 'utf8');
      this.publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    }
  }

  /**
   * Generate a JWT token
   * @param payload - The data to be encoded in the token
   * @param expiresIn - Token expiration time (e.g., '1h', '7d')
   * @returns The generated JWT token
   */
  generateToken(payload: Record<string, any>, expiresIn: string = '1h'): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: 'RS256',
      expiresIn,
    } as jwt.SignOptions);
  }

  /**
   * Verify a JWT token
   * @param token - The JWT token to verify
   * @returns The decoded token payload if valid
   * @throws Error if token is invalid
   */
  verifyToken(token: string): jwt.JwtPayload {
    try {
      return jwt.verify(token, this.publicKey, {
        algorithms: ['RS256'],
      }) as jwt.JwtPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Decode a JWT token without verification
   * @param token - The JWT token to decode
   * @returns The decoded token payload
   */
  decodeToken(token: string): jwt.JwtPayload | null {
    return jwt.decode(token) as jwt.JwtPayload | null;
  }
} 