import type { User } from "./user";

export type Paginated<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type UsersPaginatedResponse = Paginated<User>;

export interface UserResponse {
  message: string;
  user: User;
}

export interface GetAllUsersParams {
  page?: number;
  limit?: number;

  search?: string;

  role?: User["role"];
  status?: User["status"];
  gender?: User["gender"];
}

export type UpdateUserInfoPayload = Partial<
  Pick<
    User,
    | "status"
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "gender"
    | "dateOfBirth"
  >
>;

export type UpdateMePayload = Pick<User, "firstName" | "lastName">;