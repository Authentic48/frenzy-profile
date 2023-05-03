import {
  ICreateProfile,
  IGetProfile,
  IGetProfiles,
  IUpdateProfile,
} from '../../libs/interfaces/profile.interface';

export interface IProfile {
  create(data: ICreateProfile): Promise<{ isSuccessFul: boolean }>;

  update(data: IUpdateProfile): Promise<{ isSuccessFul: boolean }>;

  getProfileByUserUUID(userUUID: string, uuid: string): Promise<IGetProfile>;

  getProfiles(userUUID: string): Promise<IGetProfiles[]>;
}
