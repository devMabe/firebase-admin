import { IUser, registerParam } from "src/models/user.model";

export abstract class IIUserStorageProvider {
  get: (id: string) => Promise<IUser | undefined>;
  create: (IUserCreationParams: IUser) => Promise<IUser>;
  update: (IUser: IUser) => Promise<void>;
  delete: (id: string) => Promise<void>;
  list: (skip?: number, limit?: number) => Promise<IUser[]>;
  getByEmail: (email: string) => Promise<IUser | undefined>;
}
