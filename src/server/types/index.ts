type Article = {
  id: string;
  date: string;
  title: string;
  description: string;
  body: string;
  imageUrl: string;
  categoryId: string;
  tagIds: string[];
};

type Category = {
  id: string;
  title: string;
  description: string;
};

type Tag = {
  id: string;
  title: string;
  description: string;
};
export type { Article, Category, Tag };
