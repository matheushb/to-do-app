import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.create(createTaskDto);
  }

  findAll() {
    return this.taskRepository.findAll();
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException('Unable to find task');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);
    const task = await this.taskRepository.update(id, updateTaskDto);
    if (!task) throw new InternalServerErrorException('Unable to update task');
    return task;
  }

  async remove(id: string) {
    await this.findOne(id);
    const task = await this.taskRepository.remove(id);
    if (!task) throw new InternalServerErrorException('Unable to remove task');
    return task;
  }
}
