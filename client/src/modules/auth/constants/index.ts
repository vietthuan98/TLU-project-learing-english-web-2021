export interface IRegisterBody {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IAuthUser {
  _id: string;
  isActive: boolean;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}
