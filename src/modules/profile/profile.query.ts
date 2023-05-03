import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { IGetProfile } from '../../libs/interfaces/profile.interface';
import { RMQRoute } from 'nestjs-rmq';
import { EProfileRouteTopics } from '@tintok/tintok-common';

@Controller()
export class ProfileQuery {
  constructor(private readonly profileService: ProfileService) {}

  @RMQRoute(EProfileRouteTopics.GET_PROFILE_BY_USER_UUID_OR_UUID)
  async getProfileByUserUUID({
    userUUID,
    uuid,
  }: {
    userUUID: string;
    uuid: string;
  }): Promise<IGetProfile> {
    return this.profileService.getProfileByUserUUID(userUUID, uuid);
  }
}
