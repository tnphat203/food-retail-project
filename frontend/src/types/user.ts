export type User = {
  id: number;

  firstName: string;
  lastName: string;
  email: string;

  phone: string | null;

  gender: "male" | "female" | "other" | null;

  dateOfBirth: string | null;

  avatar: string | null;
  avatarPublicId: string | null;

  role: "customer" | "staff" | "admin";

  status: "active" | "inactive" | "banned";

  createdAt: string;
  updatedAt: string;
};