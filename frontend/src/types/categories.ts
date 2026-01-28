export type CategoryEntity = {
  id: number;
  name: string;
  slug: string;
  path: string;
  parent_id: number | null;
};

export type CategoryTree = CategoryEntity & {
  children: CategoryTree[];
};
