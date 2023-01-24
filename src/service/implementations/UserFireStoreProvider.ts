import { IUser } from "src/models/user.model";
import { IIUserStorageProvider } from "./interfaces/IUserStorageProvider";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FirebaseRepoProvider } from "./firebase/repositories";
import { UserFS } from "./firebase/model/IUserFS";
import * as admin from "firebase-admin";
@Injectable()
export class UserFireStoreProvider implements IIUserStorageProvider {
  constructor(private repos: FirebaseRepoProvider) {}

  async getByEmail(email: string): Promise<IUser | undefined> {
    const users = await this.repos.usersRepo
      .whereEqualTo("email", email)
      .find();
    if (users && users.length > 0) return users[0];
    return undefined;
  }

  toUser(to_user: Partial<IUser>): UserFS {
    return Object.assign(new UserFS(), to_user);
  }

  async get(id: string): Promise<IUser | undefined> {
    const user = await this.repos.usersRepo.findById(id);
    if (user) return user;
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async create(IUserCreationParams: IUser): Promise<IUser> {
    const u = new UserFS();
    const newUserUID = await this.createFirebaseUser(
      IUserCreationParams.email,
      IUserCreationParams.password,
      `${IUserCreationParams.name} ${IUserCreationParams.lastname}`
    );
    Object.assign(u, IUserCreationParams);
    u.id = newUserUID;
    const newUser = await this.repos.usersRepo.create(u);
    const res: any = {};
    Object.assign(res, newUser);
    return res;
  }

  async createFirebaseUser(
    email?: string,
    password?: string,
    displayName?: string
  ): Promise<string> {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    return userRecord.uid;
  }

  async update(user: IUser): Promise<void> {
    const oldUser = await this.repos.usersRepo.findById(user.id);
    if (oldUser) {
      Object.assign(oldUser, user);
      await this.repos.usersRepo.update(oldUser);
    }
  }
  async delete(id: string): Promise<void> {
    await this.repos.usersRepo.delete(id);
    return;
  }
  async list(skip?: number, limit?: number): Promise<IUser[]> {
    if (skip) console.log("Skip not implemented");
    const users = await this.repos.usersRepo.limit(limit ?? 0).find();
    return users;
  }
}
