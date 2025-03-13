import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(private readonly httpService: HttpService) {}

  async login(LoginDto: LoginDto) {
    const formData = new URLSearchParams();

    formData.append('client_id', process.env.KEYCLOAK_ADMIN_CLIENT_ID!);
    formData.append('username', LoginDto.username);
    formData.append('password', LoginDto.password);
    formData.append('client_secret', process.env.KEYCLOAK_ADMIN_CLIENT_SECRET!);
    formData.append('grant_type', 'password');

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.URL_TO_LOGIN_USERS}`,
          formData.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      console.log('oi eu caio aq');
      if (error.status === 401) {
        throw new UnauthorizedException({
          message: 'User not found',
        });
      }
      throw new BadRequestException({
        status: error.status,
        message: error.response.data.error_description ?? 'Error',
      });
    }
  }
}
