import { readDatabase, writeDatabase } from "@/server/utils";
import { Tag } from "@/server/types";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Swagger definition
/**
 * @swagger
 * /api/tags:
 *   get:
 *     description: Get all tags
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET() {
  const { tags } = readDatabase();
  return NextResponse.json(tags);
}

/**
 * @swagger
 * /api/tags:
 *   post:
 *     description: Create a new tag
 *     responses:
 *       201:
 *         description: Created
 */
export async function POST(request: NextRequest) {
  const data: Tag = await request.json();
  const newTag = { ...data, id: uuidv4() };

  const db = readDatabase();
  db.tags.push(newTag);
  writeDatabase(db);

  return NextResponse.json(newTag, { status: 201 });
}

/**
 * @swagger
 * /api/tags/{id}:
 *   put:
 *     description: Update a tag
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
  const data: Tag = await request.json();

  const db = readDatabase();
  const tagIndex = db.tags.findIndex((tag) => tag.id === id);

  if (tagIndex > -1) {
    db.tags[tagIndex] = { ...data, id: id! };
    writeDatabase(db);
    return NextResponse.json(db.tags[tagIndex]);
  }

  return NextResponse.json({ error: "Tag not found" }, { status: 404 });
}

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     description: Delete a tag
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
  const tagIndex = db.tags.findIndex((tag) => tag.id === id);

  if (tagIndex > -1) {
    const deletedTag = db.tags.splice(tagIndex, 1)[0];
    writeDatabase(db);
    return NextResponse.json({ deletedTag });
  }

  return NextResponse.json({ error: "Tag not found" }, { status: 404 });
}
