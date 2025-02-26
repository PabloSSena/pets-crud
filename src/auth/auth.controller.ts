import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  private keycloakUrl = 'http://localhost:8080';
  private clientId = 'manager';
  private clientSecret = 'pC76ZNEdZNiYw7vTUADwp269FkA60uHi';
  private redirectUri = 'http://localhost:3000/auth/callback';

  @Get('login')
  login(@Res() res: Response) {
    const authUrl = `${this.keycloakUrl}/realms/crud-pets/protocol/openid-connect/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=openid`;

    res.redirect(authUrl);
  }
}
