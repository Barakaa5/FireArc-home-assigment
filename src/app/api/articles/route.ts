import { readDatabase, writeDatabase } from "@/server/utils";
import { Article, Category, Tag } from "@/server/types";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { CardArticle } from "@/clients/types";

// Swagger definition
/**
 * @swagger
 * /api/articles:
 *   get:
 *     description: Get all articles
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET() {
  const { articles, categories, tags } = readDatabase();
  const articlesWithDetails: CardArticle[] = articles.map((article) => ({
    ...article,
    category: categories.find((category) => category.id === article.categoryId),
    tags: tags.filter((tag) => article.tagIds.includes(tag.id)),
  }));
  return NextResponse.json(articlesWithDetails);
}

/**
 * @swagger
 * /api/articles:
 *   post:
 *     description: Create a new article
 *     responses:
 *       201:
 *         description: Created
 */
export async function POST(request: NextRequest) {
  const data: Omit<Article, "id" | "imageUrl"> = await request.json();
  const imageUrl = `https://picsum.photos/id/${Math.floor(
    Math.random() * 1000
  )}/200/200`;
  const newArticle = {
    ...data,
    id: uuidv4(),
    imageUrl,
    date: new Date().toISOString(),
  };

  const db = readDatabase();
  db.articles.push(newArticle);
  writeDatabase(db);

  return NextResponse.json(newArticle, { status: 201 });
}

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     description: Update an article
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data: Omit<Article, "id" | "imageUrl" | "date"> = await request.json();

  const db = readDatabase();
  const articleIndex = db.articles.findIndex((article) => article.id === id);

  if (articleIndex > -1) {
    db.articles[articleIndex] = { ...db.articles[articleIndex], ...data };
    writeDatabase(db);
    return NextResponse.json(db.articles[articleIndex]);
  }

  return NextResponse.json({ error: "Article not found" }, { status: 404 });
}

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     description: Delete an article
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const db = readDatabase();
  const articleIndex = db.articles.findIndex((article) => article.id === id);

  if (articleIndex > -1) {
    const deletedArticle = db.articles.splice(articleIndex, 1)[0];
    writeDatabase(db);
    return NextResponse.json({ deletedArticle });
  }

  return NextResponse.json({ error: "Article not found" }, { status: 404 });
}
