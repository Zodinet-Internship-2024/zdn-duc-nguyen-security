import { Injectable } from '@nestjs/common';

import { SignInDto } from './dto/SignIn.dto';
import axios from 'axios';
import { authenticator } from 'otplib';

import { qrcode, toDataURL } from 'qrcode';

@Injectable()
export class AuthService {
  async signIn(signInDto: SignInDto) {
    const secretKey = process.env.PRIVATE_CAPTCHA_PRIVATE_KEY;

    const formData = `secret=${secretKey}&response=${signInDto.token}`;
    let res;
    try {
      res = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      console.log(res.data);
      return {
        type: 'success',
        data: res.data,
      };
    } catch (error) {
      return {
        type: 'error',
        error: error.message,
      };
    }
  }

  isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: process.env.OTP_SECRET_KEY,
    });
  }
  generateUniqueSecret = () => {
    const secret = process.env.OTP_SECRET_KEY;
    return secret;
  };
  generateOTPToken = (username, serviceName, secret) => {
    return authenticator.keyuri(username, serviceName, secret);
  };
  verifyOTPToken = (token, secret) => {
    return authenticator.verify({ token, secret });
  };
  generateQRCode = async (otpAuth) => {
    try {
      const QRCodeImageUrl = await toDataURL(otpAuth);
      return QRCodeImageUrl;
    } catch (error) {
      console.log('Could not generate QR code', error);
      return;
    }
  };
  MOCK_USER = {
    username: 'duc-zodinet',
    password: 'duc',
    is2FAEnabled: true,
    secret: this.generateUniqueSecret(),
  };
  // postEnable2FA = async () => {
  //   try {
  //     const user = this.MOCK_USER;
  //     const serviceName = 'duc.com';

  //     const otpAuth = this.generateOTPToken('duc', serviceName, user.secret);

  //     const QRCodeImage = await this.generateQRCode(otpAuth);

  //     return QRCodeImage;
  //   } catch (error) {
  //     return error.message;
  //   }
  // };

  postVerify2FA = async (otpToken) => {
    try {
      const user = this.MOCK_USER;

      const isValid = this.verifyOTPToken(otpToken, user.secret);

      return isValid;
    } catch (error) {
      return error.message;
    }
  };
}
