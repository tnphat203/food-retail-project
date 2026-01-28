import axiosInstance from "./axios.instance";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string | null;
  gender?: "male" | "female" | "other";
  phone?: string | null;
}

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

export const registerApi = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const res = await axiosInstance.post<RegisterResponse>(
    "/auth/register",
    payload
  );
  return res.data;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>("/auth/login", payload);
  return res.data;
};

export interface MeResponse {
  user: User;
}

export const getMeApi = async (): Promise<User> => {
  const res = await axiosInstance.get<MeResponse>("/auth/me");
  return res.data.user;
};

export interface RefreshResponse {
  message: string;
  accessToken: string;
  user: User;
}

export const refreshApi = async (): Promise<RefreshResponse> => {
  const res = await axiosInstance.post<RefreshResponse>("/auth/refresh");
  return res.data;
};

export interface LogoutResponse {
  message: string;
}

export const logoutApi = async (): Promise<LogoutResponse> => {
  const res = await axiosInstance.post<LogoutResponse>("/auth/logout");
  return res.data;
};
