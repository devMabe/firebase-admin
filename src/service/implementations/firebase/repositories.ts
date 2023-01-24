import { Injectable } from "@nestjs/common";
import { FirebaseServices } from "../firebaseService";
import * as fireorm from "fireorm";
import { UserFS } from "./model/IUserFS";

@Injectable()
export class FirebaseRepoProvider {
  constructor(private services: FirebaseServices) {
    fireorm.initialize(services.database);
  }

  get usersRepo() {
    return fireorm.getRepository(UserFS);
  }
}
