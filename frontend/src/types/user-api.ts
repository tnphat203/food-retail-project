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

export type UserResponse = {
  message: string;
  user: User;
};

export type GetAllUsersParams = {
  page?: number;
  limit?: number;
  search?: string | undefined;
  role?: User["role"] | "";
  status?: User["status"] | "" | undefined;
  gender?: User["gender"] | undefined;
};

export type UpdateUserPayload = Partial<
  Pick<
    User,
    "status" | "firstName" | "lastName" | "email" | "phone" | "gender" | "dateOfBirth"
  >
>;

export type UpdateMePayload = Pick<User, "firstName" | "lastName">;