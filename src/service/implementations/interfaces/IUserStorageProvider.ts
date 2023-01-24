import { IUser } from "src/models/user.model";

export abstract class IIUserStorageProvider {
  get: (id: string) => Promise<IUser | undefined>;
  create: (IUserCreationParams: Partial<Omit<IUser, "id">>) => Promise<IUser>;
  update: (IUser: IUser) => Promise<void>;
  delete: (id: string) => Promise<void>;
  list: (skip?: number, limit?: number) => Promise<IUser[]>;
}
