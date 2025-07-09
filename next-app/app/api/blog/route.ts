const mql = require("@microlink/mql");
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data } = await mql(
      "https://www.linkedin.com/posts/civicxsyllabus_civic-x-syllabus-is-the-culmination-of-passion-activity-7318305929865711616-pK_D?utm_source=share&utm_medium=member_desktop&rcm=ACoAADWGqnQBwqnz5Ukt7_IZn4iVLtEWvzTJCfY"
    );

    console.log(`link preview data: ${data}`);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

