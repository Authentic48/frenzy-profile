import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ICreateProfile } from '../../libs/interfaces/profile.interface';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class ProfileCommand {
  constructor(private readonly profileService: ProfileService) {}

  @RMQRoute('')
  async create(data: ICreateProfile): Promise<{ isSuccessFul: boolean }> {
    return this.profileService.create(data);
  }
}
