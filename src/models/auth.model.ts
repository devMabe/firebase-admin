export interface TokenResponse {
  token?: string;
  fbtoken?: string;
}

export interface TokenData {
  id?: string;
  name?: string;
  lastname?: string;
  email?: string;
  companyName?: string;
  plan?: any;
}

export type authByEmailParams = {
  email: string;
  password: string;
};
