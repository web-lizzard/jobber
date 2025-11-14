import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginInput } from './dto/login-input.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '../users/models/user.model';

interface TokenPayload {
  useId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(input: LoginInput, response: Response) {
    const user = await this.validateUser(input.email, input.password);
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.getOrThrow('JWT_EXPIRES_IN_SECONDS')
    );
    const payload: TokenPayload = {
      useId: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires,
    });

    return {
      ...user,
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
