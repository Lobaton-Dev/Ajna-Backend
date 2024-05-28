import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findAll() {
    const users = await this.userRepository.find({
      select: [
        'id',
        'full_name',
        'email',
        'cpf',
        'telephone',
        'cep',
        'city',
        'state',
        'created_at',
        'updated_at',
      ],
    })
    return users
  }

  async findOne(id: number) {
    const { password, ...user } = await this.userRepository.findOne({
      where: { id }
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
