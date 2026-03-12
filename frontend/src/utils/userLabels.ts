import type { User } from "../types/user";

export const ROLE_LABEL_MAP: Record<NonNullable<User["role"]>, string> = {
  admin: "Quản trị viên",
  staff: "Nhân viên",
  customer: "Khách hàng",
};

export const roleLabel = (r?: User["role"]) => {
  if (!r) return "-";
  return ROLE_LABEL_MAP[r];
};

export const roleVariant = (r?: User["role"]) => {
  if (r === "admin") return "success";
  if (r === "staff") return "warning";
  return "neutral";
};

export const GENDER_LABEL_MAP: Record<NonNullable<User["gender"]>, string> = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
};

export const genderLabel = (g?: User["gender"]) => {
  if (!g) return "-";
  return GENDER_LABEL_MAP[g];
};

export const STATUS_LABEL_MAP: Record<NonNullable<User["status"]>, string> = {
  active: "Đang hoạt động",
  inactive: "Tạm ngưng",
  banned: "Bị khoá",
};

export const statusLabel = (st?: User["status"]) => {
  if (!st) return "-";
  return STATUS_LABEL_MAP[st];
};

export const GENDER_FILTER_OPTIONS = [
  { label: "Tất cả", value: "all" },
  ...Object.entries(GENDER_LABEL_MAP).map(([value, label]) => ({
    label,
    value,
  })),
] as const;

export const STATUS_FILTER_OPTIONS = [
  { label: "Tất cả", value: "all" },
  ...Object.entries(STATUS_LABEL_MAP).map(([value, label]) => ({
    label,
    value,
  })),
] as const;