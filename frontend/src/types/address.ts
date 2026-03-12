export interface Address {
  id: number;

  receiverName: string;
  phone: string;

  addressLine: string;
  city: string;
  district: string;
  ward: string;

  isDefault?: boolean;

  userId: number;

  createdAt?: string;
  updatedAt?: string;
}
