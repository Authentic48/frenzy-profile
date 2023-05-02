import { Module } from '@nestjs/common';
import { ProfileQuery } from './profile.query';
import { ProfileService } from './profile.service';
import { ProfileCommand } from './profile.command';

@Module({
  controllers: [ProfileQuery, ProfileCommand],
  providers: [ProfileService, ProfileService],
})
export class ProfileModule {}
