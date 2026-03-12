import axiosInstance from "./axios.instance";
import type { CategoryTree } from "../types/categories";

export const getCategoryTreeApi = async (): Promise<CategoryTree[]> => {
  const res = await axiosInstance.get<CategoryTree[]>("/categories/tree");
  return res.data;
};
