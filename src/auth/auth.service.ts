import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.usersService.findByUsername(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTime,
    };
  }
}
