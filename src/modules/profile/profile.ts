import {
  ICreateProfile,
  IGetProfile,
} from '../../libs/interfaces/profile.interface';

export interface IProfile {
  create(data: ICreateProfile): Promise<{ isSuccessFul: boolean }>;

  getProfileByUserUUID(userUUID: string): Promise<IGetProfile>;
}
