import { db } from "../../../../db/index.js";
import { Teacher } from "../../../../db/schema.js";

export async function GET() {
  try {
    const teachers = await db
      .select()
      .from(Teacher);

    return Response.json(
      {
        success: true,
        data: teachers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Teachers Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch teachers",
      },
      { status: 500 }
    );
  }
}

