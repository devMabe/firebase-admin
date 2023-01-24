import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { authByEmailParams, TokenResponse } from "./models/auth.model";
import { IUser } from "./models/user.model";
import { IIUserStorageProvider } from "./service/implementations/interfaces/IUserStorageProvider";
import { buildTokenFromUser, generateToken } from "././service/security";
import * as admin from "firebase-admin";

@Injectable()
export class AppService {
  constructor(private userProvider: IIUserStorageProvider) {}
  getHello(): string {
    return "Hello World!";
  }

  async getUsuarios() {
    return await this.userProvider.list();
  }

  async createUser(user: IUser) {
    return await this.userProvider.create(user);
  }

  async loginUserByEmail(loginParams: authByEmailParams) {
    const user = await this.userProvider.getByEmail(loginParams.email);
    if (!user) {
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
    if (loginParams.password !== user.password)
      throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);

    return this.generateToken(user);
  }

  async registerUser(userParam: IUser) {
    const user = await this.userProvider.getByEmail(userParam.email);
    if (user) {
      throw new HttpException(
        "this email already in use",
        HttpStatus.BAD_REQUEST
      );
    } else {
      const newUser = await this.createUser(userParam);
      return this.generateToken(userParam);
    }
  }

  private async generateToken(user: IUser): Promise<TokenResponse> {
    const token = buildTokenFromUser(user);

    const fbtoken = await admin.auth().createCustomToken(user.id);
    return { token: token, fbtoken: fbtoken };
  }
}
