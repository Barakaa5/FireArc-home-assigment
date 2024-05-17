import { getRandomImage } from "@/clients/utils";
import { readDatabase, writeDatabase } from "@/server/utils";
import { Article } from "@/server/types";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
  const { articles } = readDatabase();
  return NextResponse.json(articles);
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
  const data: Article = await request.json();
  const newArticle = { ...data, id: uuidv4(), imageUrl: getRandomImage() };

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
  const data: Article = await request.json();

  const db = readDatabase();
  const articleIndex = db.articles.findIndex((article) => article.id === id);

  if (articleIndex > -1) {
    db.articles[articleIndex] = { ...data, id: id! };
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
