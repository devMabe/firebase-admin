import { Injectable } from "@nestjs/common";
import { IUser } from "./models/user.model";
import { IIUserStorageProvider } from "./service/implementations/interfaces/IUserStorageProvider";

@Injectable()
export class AppService {
  constructor(private userProvider: IIUserStorageProvider) {}
  getHello(): string {
    return "Hello World!";
  }

  async getUsuarios() {
    return await this.userProvider.list();
  }

  async createUser(user: Partial<Omit<IUser, "id">>) {
    return await this.userProvider.create(user);
  }
}
