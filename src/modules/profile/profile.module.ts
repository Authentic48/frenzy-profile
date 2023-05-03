import { Module } from '@nestjs/common';
import { ProfileQuery } from './profile.query';
import { ProfileService } from './profile.service';
import { ProfileCommand } from './profile.command';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ProfileQuery, ProfileCommand],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule {}
