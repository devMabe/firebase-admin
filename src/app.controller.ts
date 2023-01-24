import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
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

  @Post("users")
  crateUser(@Body() body: Partial<Omit<IUser, "id">>) {
    return this.appService.createUser(body);
  }
}
