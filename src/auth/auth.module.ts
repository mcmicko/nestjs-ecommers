import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../shared/user.service';

@Module({
  controllers: [AuthController],
  providers: [UserService],
  imports: [UserService]
})
export class AuthModule {}
