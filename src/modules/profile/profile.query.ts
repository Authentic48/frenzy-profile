import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { IGetProfile } from '../../libs/interfaces/profile.interface';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class ProfileQuery {
  constructor(private readonly profileService: ProfileService) {}

  @RMQRoute('')
  async getProfileByUserUUID(userUUID: string): Promise<IGetProfile> {
    return this.profileService.getProfileByUserUUID(userUUID);
  }
}
