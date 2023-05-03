import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ICreateProfile,
  IUpdateProfile,
} from '../../libs/interfaces/profile.interface';
import { RMQRoute } from 'nestjs-rmq';
import { EProfileRouteTopics } from '@tintok/tintok-common';

@Controller()
export class ProfileCommand {
  constructor(private readonly profileService: ProfileService) {}

  @RMQRoute(EProfileRouteTopics.CREATE)
  async create(data: ICreateProfile): Promise<{ isSuccessFul: boolean }> {
    return this.profileService.create(data);
  }

  @RMQRoute(EProfileRouteTopics.UPDATE)
  async update(data: IUpdateProfile): Promise<{ isSuccessFul: boolean }> {
    return this.profileService.update(data);
  }
}
