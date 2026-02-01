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
