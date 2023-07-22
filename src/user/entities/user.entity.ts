import { Task } from 'src/task/entities/task.entity';

export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  tasks: Task[];
}

export enum Role {
  admin = 'ADMIN',
  user = 'USER',
}
