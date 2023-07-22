import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  hashPassword(password: string): string {
    const salt = Number(process.env.BCRYPT_SALT);
    return bcrypt.hashSync(password, salt);
  }

  comparePassword(userPassword: string, databasePassword: string): boolean {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
}
