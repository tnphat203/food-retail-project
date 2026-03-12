import axiosInstance from "./axios.instance";
import type { User } from "../types/user";
import type {
  UsersPaginatedResponse,
  GetAllUsersParams,
  UpdateUserInfoPayload,
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

export const updateUserInfoApi = async (
  id: number,
  payload: UpdateUserInfoPayload
): Promise<UserResponse> => {
  const { data } = await axiosInstance.put<UserResponse>(
    `${BASE_URL}/${id}`,
    payload
  );
  return data;
};

export const updateUserAvatarApi = async (
  id: number,
  file: File
): Promise<UserResponse> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await axiosInstance.put<UserResponse>(
    `${BASE_URL}/${id}/avatar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
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

export const updateMyAvatarApi = async (
  file: File
): Promise<UserResponse> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await axiosInstance.put<UserResponse>(
    `${BASE_URL}/me/avatar`,
    formData
  );
  return data;
};