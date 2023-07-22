import { User } from 'src/user/entities/user.entity';

export class Task {
  name: string;
  description?: string;
  situation: Situation;
  deadline: Date;
  user: User;
}

export enum Situation {
  todo = 'TODO',
  doing = 'DOING',
  done = 'DONE',
}
