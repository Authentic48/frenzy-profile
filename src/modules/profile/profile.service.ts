import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IProfile } from './profile';
import {
  ICreateProfile,
  IGetProfile,
} from '../../libs/interfaces/profile.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import {
  NotFoundException,
  RMQInternalServerError,
} from '@tintok/tintok-common';
import { ProfileAlreadyExistException } from '../../libs/exceptions/already-exists.exception';

@Injectable()
export class ProfileService implements IProfile {
  private readonly logger: Logger = new Logger(ProfileService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreateProfile): Promise<{ isSuccessFul: boolean }> {
    try {
      await this.prisma.profile.create({
        data: data,
      });

      return { isSuccessFul: true };
    } catch (e) {
      this.logger.error(e);
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw new ProfileAlreadyExistException();
      throw new RMQInternalServerError('profile');
    }
  }

  async getProfileByUserUUID(userUUID: string): Promise<IGetProfile> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userUUID,
      },
      select: {
        uuid: true,
        name: true,
        bio: true,
        gender: true,
        age: true,
        height: true,
        photos: true,
        languages: true,
        location: true,
        interests: true,
        socialMedias: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    if (!profile) throw new NotFoundException('profile');

    return profile;
  }
}
