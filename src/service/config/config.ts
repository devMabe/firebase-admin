import "dotenv/config";

export const FIREBASE_PROJECT_ID = <string>process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_CLIENT_EMAIL = <string>process.env.FIREBASE_CLIENT_EMAIL;
export const FIREBASE_BUCKET_URL = <string>process.env.FIREBASE_BUCKET_URL;
export const FIREBASE_PRIVATE_KEY = <string>(
  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
);

export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY ?? "sarasa";
// git config --global remote.origin.url=
const secondDay = 60 * 60 * 24; // un día
export const TOKEN_EXPIRE_IN = parseInt(
  process.env.TOKEN_EXPIRE_IN ?? `${secondDay}`
);
