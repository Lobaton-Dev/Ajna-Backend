import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    delete user.password;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;
    return this.userRepository.softDelete(user);
  }
}
