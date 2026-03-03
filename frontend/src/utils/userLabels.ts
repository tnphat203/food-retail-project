import type { User } from "../types/user";

export const roleVariant = (r?: User["role"]) => {
  if (r === "admin") return "success";
  if (r === "staff") return "warning";
  return "neutral";
};

export const roleLabel = (r?: User["role"]) => {
  if (r === "admin") return "Quản trị viên";
  if (r === "staff") return "Nhân viên";
  if (r === "customer") return "Khách hàng";
  return "-";
};

export const genderLabel = (g?: User["gender"]) => {
  if (g === "male") return "Nam";
  if (g === "female") return "Nữ";
  if (g === "other") return "Khác";
  return "-";
};

export const statusLabel = (st?: User["status"]) => {
  if (st === "active") return "Đang hoạt động";
  if (st === "inactive") return "Tạm ngưng";
  if (st === "banned") return "Bị khoá";
  return "-";
};
