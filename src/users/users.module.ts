import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
