// types/category.ts

/* =========
 * Base type (khớp DB)
 * ========= */
export type CategoryEntity = {
  id: number;
  name: string;
  slug: string;
  path: string;
  parent_id: number | null;
};

/* =========
 * UI Tree type
 * ========= */
export type CategoryTree = CategoryEntity & {
  children: CategoryTree[];
};

