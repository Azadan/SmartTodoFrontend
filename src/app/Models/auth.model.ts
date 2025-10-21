import {UserModel} from './user.model';

export interface authRequest {
  email: string;
  password: string;
}

export interface authResponse {
  jwt:string;
  userDTO: UserModel;
}
