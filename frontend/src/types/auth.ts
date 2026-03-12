import type { User } from "./user";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  phone: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface MeResponse {
  user: User;
}

export interface RefreshResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}
