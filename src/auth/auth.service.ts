/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      await this.userRepository.save(newUser);

      return omit(newUser, ['password']);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error?.code === '23505') {
      throw new BadRequestException(error?.detail);
    }

    console.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
