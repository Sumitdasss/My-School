
import { db } from "../../../../db/index.js";
import { Parent } from "../../../../db/schema.js";

export async function GET() {
  try {
    const parents = await db
      .select()
      .from(Parent);

    return Response.json(
      {
        success: true,
        data: parents,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Parents Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch parents",
      },
      { status: 500 }
    );
  }
}

