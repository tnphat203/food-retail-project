import type { User } from "@/types/user";

type StatusValue = NonNullable<User["status"]>;
type GenderValue = NonNullable<User["gender"]>;

export type EditInfoForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: GenderValue;
  status: StatusValue;
  dateOfBirth: string;
};

export type AvatarValue = string | File | undefined;

export type InfoFormErrors = Partial<Record<keyof EditInfoForm, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^0\d{9}$/;

const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;

const ALLOWED_STATUS: StatusValue[] = ["active", "inactive", "banned"];
const ALLOWED_GENDER: GenderValue[] = ["male", "female", "other"];

export function validateCustomerInfoForm(
  form: EditInfoForm | null
): InfoFormErrors {
  if (!form) return {};

  const errors: InfoFormErrors = {};

  const firstName = form.firstName.trim();
  const lastName = form.lastName.trim();
  const email = form.email.trim();
  const phone = form.phone.trim();

  if (!firstName) errors.firstName = "Vui lòng nhập họ";
  else if (firstName.length > MAX_NAME_LENGTH)
    errors.firstName = "Họ tối đa 50 ký tự";

  if (!lastName) errors.lastName = "Vui lòng nhập tên";
  else if (lastName.length > MAX_NAME_LENGTH)
    errors.lastName = "Tên tối đa 50 ký tự";

  if (!email) errors.email = "Vui lòng nhập email";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Email không hợp lệ";
  else if (email.length > MAX_EMAIL_LENGTH) errors.email = "Email quá dài";

  if (!phone) errors.phone = "Vui lòng nhập số điện thoại";
  else if (!PHONE_REGEX.test(phone))
    errors.phone = "SĐT phải gồm 10 chữ số và bắt đầu bằng 0";

  if (!ALLOWED_STATUS.includes(form.status))
    errors.status = "Trạng thái không hợp lệ";

  if (!ALLOWED_GENDER.includes(form.gender))
    errors.gender = "Giới tính không hợp lệ";

  if (!isValidDateOfBirth(form.dateOfBirth))
    errors.dateOfBirth = "Ngày sinh không hợp lệ";

  return errors;
}

export function validateCustomerAvatar(
  avatar: AvatarValue
): string | undefined {
  if (!avatar) return;

  if (typeof avatar === "string") {
    const isHttp = /^https?:\/\//.test(avatar);
    const isBase64 = /^data:image\//.test(avatar);

    if (!isHttp && !isBase64) {
      return "Avatar phải là URL hoặc Base64 hợp lệ";
    }
  }

  if (avatar instanceof File) {
    if (!avatar.type.startsWith("image/")) {
      return "File phải là hình ảnh";
    }

    if (avatar.size > 2 * 1024 * 1024) {
      return "Kích thước tối đa 2MB";
    }
  }
}

function isValidDateOfBirth(dob: string) {
  if (!dob) return true;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return false;

  const [y, m, d] = dob.split("-").map(Number);
  const date = new Date(y, m - 1, d);

  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return false;
  }

  const today = new Date();

  if (date > today) return false;

  const age = today.getFullYear() - y;

  if (age > 120) return false;

  return true;
}