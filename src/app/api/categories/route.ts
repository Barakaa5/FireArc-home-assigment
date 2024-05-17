import { readDatabase, writeDatabase } from "@/server/utils";
import { Category } from "@/server/types";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Swagger definition
/**
 * @swagger
 * /api/categories:
 *   get:
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET() {
  const { categories } = readDatabase();
  return NextResponse.json(categories);
}

/**
 * @swagger
 * /api/categories:
 *   post:
 *     description: Create a new category
 *     responses:
 *       201:
 *         description: Created
 */
export async function POST(request: NextRequest) {
  const data: Category = await request.json();
  const newCategory = { ...data, id: uuidv4() };

  const db = readDatabase();
  db.categories.push(newCategory);
  writeDatabase(db);

  return NextResponse.json(newCategory, { status: 201 });
}

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     description: Update a category
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
  const data: Category = await request.json();

  const db = readDatabase();
  const categoryIndex = db.categories.findIndex(
    (category) => category.id === id
  );

  if (categoryIndex > -1) {
    db.categories[categoryIndex] = { ...data, id: id! };
    writeDatabase(db);
    return NextResponse.json(db.categories[categoryIndex]);
  }

  return NextResponse.json({ error: "Category not found" }, { status: 404 });
}

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     description: Delete a category
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
  const categoryIndex = db.categories.findIndex(
    (category) => category.id === id
  );

  if (categoryIndex > -1) {
    const deletedCategory = db.categories.splice(categoryIndex, 1)[0];
    writeDatabase(db);
    return NextResponse.json({ deletedCategory });
  }

  return NextResponse.json({ error: "Category not found" }, { status: 404 });
}
