import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id1: string, id2: string) {
    return this.usersRepository.findOneBy({ id1, id2 });
  }
  async createUser(user: CreateUserDto) {
    return this.usersRepository.save(user);
  }
}
