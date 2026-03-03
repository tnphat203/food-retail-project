import axiosInstance from "./axios.instance";
import type { AxiosError } from "axios";
import type { User } from "../types/user";
import type {
  UsersPaginatedResponse,
  GetAllUsersParams,
  UpdateUserPayload,
  UpdateMePayload,
  UserResponse,
} from "../types/user-api";

const BASE_URL = "/users";

export const getAllUsersApi = async (
  params?: GetAllUsersParams
): Promise<UsersPaginatedResponse> => {
  const { data } = await axiosInstance.get<UsersPaginatedResponse>(BASE_URL, {
    params,
  });
  return data;
};

export const getUserByIdApi = async (id: number): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`${BASE_URL}/${id}`);
  return data;
};

export const updateUserApi = async (
  id: number,
  payload: UpdateUserPayload
): Promise<UserResponse> => {
  console.log("🔄 updateUserApi request", { id, payload });

  try {
    const { data } = await axiosInstance.put<UserResponse>(
      `${BASE_URL}/${id}`,
      payload
    );

    console.log("✅ updateUserApi success", data);
    return data;
  } catch (e) {
    const err = e as AxiosError;

    console.error("❌ updateUserApi failed", {
      id,
      payload,
      status: err.response?.status,
      responseData: err.response?.data,
      message: err.message,
    });

    throw err;
  }
};

export const changeUserStatusApi = async (
  id: number,
  status: NonNullable<User["status"]>
): Promise<UserResponse> => {
  const { data } = await axiosInstance.patch<UserResponse>(
    `${BASE_URL}/${id}/status`,
    { status }
  );
  return data;
};

export const updateMeApi = async (
  payload: UpdateMePayload
): Promise<UserResponse> => {
  const { data } = await axiosInstance.put<UserResponse>(
    `${BASE_URL}/me`,
    payload
  );
  return data;
};