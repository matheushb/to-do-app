import { Role } from 'src/user/entities/user.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}
