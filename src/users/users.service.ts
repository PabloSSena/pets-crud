import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { Credentials, UserKeycloakDTO } from './dto/user-to-keycloak';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(private readonly httpService: HttpService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const acces_token = await this.getAdminToken();
      let user: UserKeycloakDTO = new UserKeycloakDTO();
      user.username = createUserDto.username;
      user.email = createUserDto.email;

      let credential: Credentials = new Credentials();
      credential.value = createUserDto.password;
      credential.type = 'password';
      credential.temporary = false;
      user.credentials = [credential];
      await firstValueFrom(
        this.httpService.post(
          `${process.env.KEYCLOAK_ADMIN_BASE_URL}/users`,
          user,
          {
            headers: {
              Authorization: `Bearer ${acces_token}`,
            },
          },
        ),
      );
      return {
        username: createUserDto.username,
        password: createUserDto.password,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create a user');
    }
  }

  private async getAdminToken() {
    const formData = new URLSearchParams();

    formData.append('client_id', process.env.KEYCLOAK_ADMIN_CLIENT_ID!);
    formData.append('client_secret', process.env.KEYCLOAK_ADMIN_CLIENT_SECRET!);
    formData.append('grant_type', 'client_credentials');

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.KEYCLOAK_LOGIN_URL}`,
          formData.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );
      const acces_token = response.data.access_token;
      return acces_token;
    } catch (error) {
      throw new Error(`Admin login failed: ${error}`);
    }
  }
}
