import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/types/user';
import crypto from 'node:crypto';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  create(login: string, password: string): User {
    const id = crypto.randomUUID();
    const user: User = {
      id,
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);
    return user;
  }
}
