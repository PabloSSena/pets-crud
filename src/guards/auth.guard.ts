import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user: string | jwt.JwtPayload | null;
}

@Injectable()
export class authGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const authHeader = request.headers;
    if (!authHeader['authorization']) {
      throw new UnauthorizedException('Token JWT not found');
    }
    const token = authHeader['authorization'].split(' ')[1];
    const decodedToken = jwt.decode(token);
    if (decodedToken!['iss'] != 'http://localhost:8080/realms/crud-pets') {
      throw new UnauthorizedException('Token inválido');
    }
    if (!decodedToken || typeof decodedToken === 'string') {
      throw new UnauthorizedException('Token inválido');
    }
    request.user = decodedToken['name'];
    return true;
  }
}
