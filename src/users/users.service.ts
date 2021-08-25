import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAllUsers() {
    return this.usersRepository.find();
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new NotFoundException(
      `"email: ${email}" 을 사용하는 계정을 찾지 못했습니다. `,
    );
  }

  async createUser(userData: CreateUserDto) {
    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);
    return user;
  }
}
