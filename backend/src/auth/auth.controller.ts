import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/SignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  create(@Body() signInDto: SignInDto) {
    console.log(123);
    return this.authService.signIn(signInDto);
  }

  // @Get('enable-2fa')
  // async createEnable2FA() {
  //   return this.authService.postEnable2FA();
  // }
  @Post('verify-otp')
  async verifyCode(@Body() body) {
    const otp = body.otp;
    return this.authService.postVerify2FA(otp);
  }
}
