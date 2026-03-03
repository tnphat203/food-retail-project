export interface User {
  id: number;

  firstName: string;
  lastName: string;
  email: string;

  password?: string | null; 
  phone?: string | null;

  gender?: "male" | "female" | "other";
  dateOfBirth?: string | null; 

  avatar?: string | null;

  role: "customer" | "staff" | "admin";
  status?: "active" | "inactive" | "banned";

  createdAt?: string;
  updatedAt?: string;
}
