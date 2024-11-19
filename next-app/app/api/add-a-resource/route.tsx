import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

const baseId = process.env.AIRTABLE_BASE_ID;
const apiKey = process.env.AIRTABLE_API_KEY;

const airtable = new Airtable({ apiKey });
const base = airtable.base(baseId!);

const tableName = "New resources from Users";
const viewName = "Grid view";

if (!baseId || !apiKey) {
  throw new Error(
    "Missing Airtable Base ID or API Key in environment variables."
  );
}

export async function GET(request: NextRequest) {
  try {
    const records: any[] = [];

    await base(tableName)
      .select({ view: viewName })
      .eachPage((pageRecords, fetchNextPage) => {
        pageRecords.forEach((record) => {
          records.push({
            id: record.id,
            fields: record.fields,
          });
        });
        fetchNextPage();
      });

    return NextResponse.json(records);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user submitted resources" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // validate the body

  // add the submitted resouce to the airtable base
}
