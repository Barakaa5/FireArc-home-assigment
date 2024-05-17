import fs from "fs";
import path from "path";
import { Article, Category, Tag } from "../types";

const dbPath = path.resolve(process.cwd(), "public/database.json");

export const readDatabase = (): {
  articles: Article[];
  categories: Category[];
  tags: Tag[];
} => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

export const writeDatabase = (data: {
  articles: Article[];
  categories: Category[];
  tags: Tag[];
}): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
};
