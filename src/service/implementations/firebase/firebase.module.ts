import { Module } from "@nestjs/common";
import { FirebaseServices } from "../firebaseService";
import { IIUserStorageProvider } from "../interfaces/IUserStorageProvider";
import { UserFireStoreProvider } from "../UserFireStoreProvider";
import { FirebaseRepoProvider } from "./repositories";
@Module({
  providers: [
    {
      provide: IIUserStorageProvider,
      useClass: UserFireStoreProvider,
    },
    FirebaseServices,
    FirebaseRepoProvider,
  ],
  exports: [
    {
      provide: IIUserStorageProvider,
      useClass: UserFireStoreProvider,
    },
  ],
})
export class FirebaseModule {}
