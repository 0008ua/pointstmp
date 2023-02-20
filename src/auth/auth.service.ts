import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserModel,
  UserDocument,
  UserRoles,
  User,
} from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { genSaltSync, hash, compare } from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { v4 as uuidv4 } from 'uuid';
import { DB_ERROR, INTERNAL_SERVER_ERROR } from '../common/error.constants';
import { UserDataDto } from './dto/userData.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    private jwtService: JwtService,
  ) {}

  createUserData(user: UserDocument): UserDataDto {
    return {
      name: user.name,
      role: user.role,
      _id: user._id.toString(),
    };
  }

  async createUser(dto: SignupDto): Promise<UserDataDto> {
    let user: User;
    if (dto && dto.name && dto.password) {
      // singnup new user
      user = { ...dto, role: UserRoles.Member };
    } else {
      // signup anonymus user
      user = {
        role: UserRoles.Guest,
        name: uuidv4(),
        password: uuidv4(),
      };
    }
    return this.userModel
      .isNameUnique(user.name)
      .then(() => hash(user.password, genSaltSync()))
      .then((hash) => {
        user.password = hash;
        return this.userModel.createUser(user);
      })
      .then((newUser) => this.createUserData(newUser));
  }

  async createJwt(sub: any, prefix = 'Bearer ', exp = 300): Promise<string> {
    const date = Math.floor(Date.now() / 1000); // in seconds
    const subject = {
      ...sub,
      iat: date, // seconds
      exp: date + exp, // seconds
    };
    let token: string;
    try {
      token = await this.jwtService.signAsync(subject);
    } catch (error) {
      throw new HttpException(...INTERNAL_SERVER_ERROR);
    }
    return prefix + token;
  }

  async findById(userId: string): Promise<UserDataDto> {
    try {
      return this.createUserData(await this.userModel.findById(userId));
    } catch (error) {
      throw new HttpException(...DB_ERROR);
    }
  }
}
