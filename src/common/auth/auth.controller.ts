import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { User } from '../decorators/user.decorator';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/localAuthGuard';
import { JwtAuthGuard } from './guards/jwtAuthGuard';

@ApiSecurity('bearer')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignInDto })
  @UseGuards(LocalAuthGuard)
  @Post()
  signIn(@User() user: UserEntity) {
    return this.authService.signIn(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@User() user: UserEntity) {
    return user;
  }
}
