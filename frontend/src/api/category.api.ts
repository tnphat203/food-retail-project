import { ENV } from "../config/env";
import { apiFetch,  } from "../lib/api";
import type { CategoryTree } from "../types/categories";

export const getCategoryTree = () => {
  return apiFetch<CategoryTree[]>(
    `${ENV.API_URL}/categories/tree`
  );
};
