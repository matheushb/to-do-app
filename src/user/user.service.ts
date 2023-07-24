import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}
  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.bcryptService.hashPassword(
      createUserDto.password,
    );
    return this.userRepository.create(createUserDto);
  }

  async findAll(paginationParams: PaginationParams) {
    const users = await this.userRepository.findAll(paginationParams);
    return {
      results: users.length,
      users,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) throw new NotFoundException('User not found by email');
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findOne(id);
    const user = await this.userRepository.update(id, data);
    if (!user) throw new InternalServerErrorException('Unable to update user');
    return user;
  }

  async remove(id: string) {
    await this.findOne(id);
    const user = await this.userRepository.remove(id);
    if (!user) throw new InternalServerErrorException('Unable to remove user');
    return user;
  }
}
