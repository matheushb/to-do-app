import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: CreateUserDto) {
    return this.prismaService.user.create({ data });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prismaService.user.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
