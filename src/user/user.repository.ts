import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { EnabledFields } from 'src/common/interfaces/enabledFields';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';

const enabledFields: EnabledFields = {
  id: true,
  email: true,
  name: true,
  role: true,
};
@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: CreateUserDto) {
    return this.prismaService.user.create({ data });
  }

  findAll(paginationParams: PaginationParams) {
    console.log(paginationParams);
    return this.prismaService.user.findMany({
      select: enabledFields,
      skip: Number((paginationParams.page - 1) * paginationParams.perPage),
      take: Number(paginationParams.perPage),
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: enabledFields,
    });
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: enabledFields,
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data,
      select: enabledFields,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
      select: enabledFields,
    });
  }
}
