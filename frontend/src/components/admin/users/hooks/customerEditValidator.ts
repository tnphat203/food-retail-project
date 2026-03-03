import type { User } from "../../../../types/user";

type StatusValue = NonNullable<User["status"]>;
type GenderValue = NonNullable<User["gender"]>;

export type EditForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: GenderValue;
  status: StatusValue;
  dateOfBirth: string;
  avatar: string | File | undefined;
};

export type FormErrors = Partial<Record<keyof EditForm, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+0-9\s-]{9,15}$/;

const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const MAX_PHONE_LENGTH = 20;

const ALLOWED_STATUS: StatusValue[] = ["active", "inactive", "banned"];
const ALLOWED_GENDER: GenderValue[] = ["male", "female", "other"];

export function validateCustomerEditForm(
  form: EditForm | null
): FormErrors {
  if (!form) return {};

  const errors: FormErrors = {};

  if (!form.firstName.trim()) errors.firstName = "Vui lòng nhập họ";
  else if (form.firstName.length > MAX_NAME_LENGTH)
    errors.firstName = "Họ tối đa 50 ký tự";

  if (!form.lastName.trim()) errors.lastName = "Vui lòng nhập tên";
  else if (form.lastName.length > MAX_NAME_LENGTH)
    errors.lastName = "Tên tối đa 50 ký tự";

  if (!form.email.trim()) errors.email = "Vui lòng nhập email";
  else if (!EMAIL_REGEX.test(form.email.trim()))
    errors.email = "Email không hợp lệ";
  else if (form.email.length > MAX_EMAIL_LENGTH)
    errors.email = "Email quá dài";

  if (form.phone && !PHONE_REGEX.test(form.phone.trim()))
    errors.phone = "SĐT không hợp lệ";
  if (form.phone && form.phone.length > MAX_PHONE_LENGTH)
    errors.phone = "SĐT quá dài";

  if (!ALLOWED_STATUS.includes(form.status))
    errors.status = "Trạng thái không hợp lệ";

  if (!ALLOWED_GENDER.includes(form.gender))
    errors.gender = "Giới tính không hợp lệ";

  if (!isValidDateOfBirth(form.dateOfBirth))
    errors.dateOfBirth = "Ngày sinh không hợp lệ";

  if (form.avatar) {
    if (typeof form.avatar === "string") {
      if (!/^https?:\/\//.test(form.avatar))
        errors.avatar = "Avatar phải là URL hợp lệ";
    } else if (form.avatar instanceof File) {
      if (!form.avatar.type.startsWith("image/"))
        errors.avatar = "File phải là hình ảnh";

      if (form.avatar.size > 2 * 1024 * 1024)
        errors.avatar = "Kích thước tối đa 2MB";
    }
  }

  return errors;
}

function isValidDateOfBirth(dob: string) {
  if (!dob) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return false;

  const [y, m, d] = dob.split("-").map(Number);
  const date = new Date(y, m - 1, d);

  return !Number.isNaN(date.getTime()) && date <= new Date();
}