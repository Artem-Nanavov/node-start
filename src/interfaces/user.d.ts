export interface ILogin {
  password: string;
  email: string;
}

export interface ICreateUser extends ILogin {
  username: string;
}

export interface IUser extends ICreateUser {
  _id: string;
  role: string;
  salt: string;
}

export interface IRefreshTokens {
  refresh: string;
}
