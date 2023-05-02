import { Gender, SocialMedias } from '@prisma/client';

export interface ICreateProfile {
  userUUID: string;

  name: string;
  bio: string;
  location: string;
  age: number;
  height: string;
  gender: Gender;
  interests: string[];
  photos: string[];
  languages: string[];
}

export interface ISocialMedia {
  name: SocialMedias;

  username: string;
}

export interface IGetProfile {
  uuid: string;
  name: string;
  bio: string;
  location: string;
  age: number;
  height: string;
  gender: Gender;
  interests: string[];
  photos: string[];
  languages: string[];
}
