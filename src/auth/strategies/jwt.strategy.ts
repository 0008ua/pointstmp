import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserDataDto } from '../dto/userData.dto';
import { UserDocument, User, UserModel } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    readonly configService: ConfigService,
    readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(userData: UserDataDto & { exp: number; iat: number }): Promise<UserDataDto> {
    const userFromDb = await this.userModel.findUserByIdAndUpdateTimestamp(userData._id);
    return this.authService.createUserData(userFromDb);
  }
}
