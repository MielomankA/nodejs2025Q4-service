import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { User } from 'src/types/user';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/dto/update-password.dto';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private readonly logger: LoggingService) {}

  private hidePassword(user: User) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  findAll() {
    this.logger.customLog('Fetching all users', UserService.name, {
      source: 'UserService',
    });

    return this.users.map((user) => this.hidePassword(user));
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.hidePassword(user);
  }

  create(dto: CreateUserDto) {
    if (!dto.login || !dto.password) {
      throw new BadRequestException(
        'Missing required fields: login and password',
      );
    }

    const timestamp = Date.now();

    const newUser: User = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.push(newUser);

    return this.hidePassword(newUser);
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    if (!dto.oldPassword || !dto.newPassword) {
      throw new BadRequestException('Missing oldPassword or newPassword');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return this.hidePassword(user);
  }

  delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);
  }
}
