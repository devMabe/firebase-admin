import { Collection } from "fireorm";
import { IUser } from "src/models/user.model";

@Collection("users")
export class UserFS implements IUser {
  id: string;
  name: string;
  lastname: string;
  companyName: string;
  email: string;
}
