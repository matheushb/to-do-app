import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';

@Injectable()
export class TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateTaskDto) {
    return this.prismaService.task.create({ data });
  }

  findAll(paginationParams: PaginationParams) {
    return this.prismaService.task.findMany();
  }

  findOne(id: string) {
    return this.prismaService.task.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateTaskDto) {
    return this.prismaService.task.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prismaService.task.delete({ where: { id } });
  }
}
