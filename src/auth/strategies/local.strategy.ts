import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { SignupDto } from '../dto/signup.dto';
import { UserDataDto } from '../dto/userData.dto';
import { UserModel, User } from '../entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    readonly authService: AuthService,
  ) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }

  async validate(name: string, password: string): Promise<UserDataDto> {
    const userCandidate: SignupDto = {
      name,
      password,
    };
    return this.userModel
      .isNameExist(userCandidate.name)
      .then((userFromDb) => this.userModel.isPasswordMatched(userCandidate.password, userFromDb))
      .then((userFromDb) => this.authService.createUserData(userFromDb));
  }
}
