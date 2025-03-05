import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class authGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers;

    if (!authHeader) {
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
    return true;
  }
}
