import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';
import { compareHash, genHash } from './util/bcHandler';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;

    const userParse = {
      ...user,
      password: await genHash(password),
    };

    const newUser = await this.userRepository.save(userParse);
    delete newUser.password;
    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const userExist = await this.userRepository.findOne({
      where: { email },
    });

    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck)
      throw new HttpException('SOMENTHING_WRONG', HttpStatus.CONFLICT);

    delete userExist.password;

    const payload = {
      id: userExist.id,
    };

    const token = this.jwtService.sign(payload);

    const userData = {
      token,
      user: userExist,
    };

    return userData;
  }
}
