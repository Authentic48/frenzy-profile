import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IProfile } from './profile';
import {
  ICreateProfile,
  IGetProfile,
  IGetProfiles,
  IUpdateProfile,
} from '../../libs/interfaces/profile.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  NotFoundException,
  RMQInternalServerError,
} from '@tintok/tintok-common';
import { ProfileAlreadyExistException } from '../../libs/exceptions/already-exists.exception';

@Injectable()
export class ProfileService implements IProfile {
  private readonly logger: Logger = new Logger(ProfileService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getProfiles(userUUID: string): Promise<IGetProfiles[]> {
    const profile = await this.prisma.profile.findUniqueOrThrow({
      where: { userUUID },
      select: {
        interests: true,
        location: true,
        gender: true,
        age: true,
        languages: true,
      },
    });
    // TODO: Improve filter
    return this.prisma.profile.findMany({
      where: {
        userUUID: {
          not: userUUID,
        },
        interests: {
          hasSome: profile.interests,
        },
        languages: {
          hasSome: profile.languages,
        },
        gender: {
          not: profile.gender,
        },
        age: {
          lte: profile.age,
        },
      },
      select: {
        uuid: true,
        name: true,
        bio: true,
        age: true,
        photos: true,
        location: true,
      },
    });
  }

  async create(data: ICreateProfile): Promise<{ isSuccessFul: boolean }> {
    try {
      await this.prisma.profile.create({
        data: data,
      });

      return { isSuccessFul: true };
    } catch (e) {
      this.logger.error(e);
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ProfileAlreadyExistException();
      }

      throw new RMQInternalServerError('profile');
    }
  }

  async getProfileByUserUUID(
    userUUID: string,
    uuid: string,
  ): Promise<IGetProfile> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        OR: [
          {
            uuid,
          },
          {
            userUUID,
          },
        ],
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

  async update({
    name,
    bio,
    age,
    height,
    gender,
    photos,
    location,
    languages,
    interests,
    userUUID,
    socialMedias,
  }: IUpdateProfile): Promise<{ isSuccessFul: boolean }> {
    try {
      if (Array.isArray(socialMedias) && socialMedias.length) {
        await this.prisma.profile.update({
          where: { userUUID },
          data: {
            name,
            bio,
            height,
            photos,
            location,
            languages,
            interests,
            gender,
            age,
            socialMedias: {
              deleteMany: {},
              createMany: {
                data: socialMedias,
              },
            },
          },
        });

        return { isSuccessFul: true };
      }

      await this.prisma.profile.update({
        where: { userUUID },
        data: {
          name,
          bio,
          height,
          photos,
          location,
          languages,
          interests,
          gender,
          age,
        },
      });

      return { isSuccessFul: true };
    } catch (e) {
      this.logger.error(e);
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('profile');
      }

      throw new RMQInternalServerError('profile');
    }
  }
}
