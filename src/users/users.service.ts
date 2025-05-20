import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = hashSync(newUser.password, 10);

    this.users.push(newUser);
  }

  findByUsername(username: string): UserDto | null {
    return this.users.find((user) => user.username === username);
  }
}
