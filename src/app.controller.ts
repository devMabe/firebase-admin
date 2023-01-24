import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { authByEmailParams, TokenResponse } from "./models/auth.model";
import { IUser } from "./models/user.model";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("users")
  getUsuarios() {
    return this.appService.getUsuarios();
  }

  @Post("login")
  login(@Body() body: authByEmailParams): Promise<TokenResponse> {
    return this.appService.loginUserByEmail(body);
  }

  @Post("register")
  register(@Body() body: IUser) {
    return this.appService.registerUser(body);
  }
}
