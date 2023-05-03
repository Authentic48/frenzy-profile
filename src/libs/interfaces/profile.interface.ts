import { Gender, SocialMedia } from '@prisma/client';

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

export interface IUpdateProfile {
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

  socialMedias: ISocialMedia[];
}

export interface ISocialMedia {
  name: SocialMedia;

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

export interface IGetProfiles {
  uuid: string;
  name: string;
  location: string;
  age: number;
  photos: string[];
}
