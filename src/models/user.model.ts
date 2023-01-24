export interface IUser {
  id: string;
  name?: string;
  lastname?: string;
  companyName?: string;
  email?: string;
  password?: string;
}

export type registerParam = Omit<IUser, "id">;
export type loginParam = Omit<
  IUser,
  "id" | "name" | "lastname" | "companyName"
>;
