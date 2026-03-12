import axiosInstance from "./axios.instance";
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  RefreshResponse,
  LogoutResponse,
  MeResponse,
} from "../types/auth";
import type { User } from "../types/user";

export const registerApi = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const res = await axiosInstance.post<RegisterResponse>(
    "/auth/register",
    payload
  );
  return res.data;
};

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>("/auth/login", payload);
  return res.data;
};

export const getMeApi = async (): Promise<User> => {
  const res = await axiosInstance.get<MeResponse>("/auth/me");
  return res.data.user;
};

export const refreshApi = async (): Promise<RefreshResponse> => {
  const res = await axiosInstance.post<RefreshResponse>("/auth/refresh");
  return res.data;
};

export const logoutApi = async (): Promise<LogoutResponse> => {
  const res = await axiosInstance.post<LogoutResponse>("/auth/logout");
  return res.data;
};
