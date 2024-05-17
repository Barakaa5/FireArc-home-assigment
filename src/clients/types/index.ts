import { Article, Category, Tag } from "@/server/types";

export interface CardArticle extends Article {
  category?: Category;
  tags?: Tag[];
}
