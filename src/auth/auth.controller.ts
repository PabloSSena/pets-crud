import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    Logger.log(`USER WITH USERNAME ${loginDto.username} IS TRYING TO LOG IN`)
    return this.authService.login(loginDto);
  }
}
