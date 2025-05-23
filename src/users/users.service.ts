import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto) {
    const userAlreadyExists = await this.findByUsername(newUser.username);

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create({
      username: newUser.username,
      passwordHash: bcryptHashSync(newUser.password, 10),
    });

    const { id, username } = await this.userRepository.save(user);

    return { id, username };
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }
}
