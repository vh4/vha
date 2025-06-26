"use server";

import fs from "fs/promises";
import moment from "moment-timezone";

type CalendarData = {
  calendarId?: string;
  date?: string;
  country?: string;
  category?: string;
  event?: string;
  reference?: string;
  referenceDate?: string;
  source?: string;
  sourceUrl?: string;
  actual?: string;
  previous?: string;
  forecast?: string;
  teForecast?: string;
  url?: string;
  dateSpan?: string;
  importance?: string;
  lastUpdate?: string;
  revised?: string;
  currency?: string;
  unit?: string;
  ticker?: string;
  symbol?: string;
};

type CalendarGroupedData = Record<string, CalendarData[]>;

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const startDate: string | undefined = body.startDate; // "2025-06-22"
    const endDate: string | undefined = body.endDate; // "2025-06-30"
    const impact = body.impact; // "2" or ["1", "2"]

    // Validate range
    const validStart =
      startDate && moment(startDate, "YYYY-MM-DD", true).isValid()
        ? moment(startDate, "YYYY-MM-DD")
        : null;
    const validEnd =
      endDate && moment(endDate, "YYYY-MM-DD", true).isValid()
        ? moment(endDate, "YYYY-MM-DD")
        : null;

    if (!validStart || !validEnd) {
      return new Response(
        JSON.stringify({
          rc: "01",
          rd: "Invalid or missing startDate/endDate",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Read and parse JSON file
    const rawData = await fs.readFile("./data/economy-calendar.json", "utf-8");
    const jsonData: CalendarGroupedData = JSON.parse(rawData);

    const impactValues = impact
      ? Array.isArray(impact)
        ? impact
        : [impact]
      : null;
    const filteredData: CalendarGroupedData = {};

    for (const dateKey in jsonData) {
      const currentDate = moment(dateKey, "YYYY-MM-DD");

      // Check if within range
      if (currentDate.isBetween(validStart, validEnd, undefined, "[]")) {
        let entries = jsonData[dateKey];

        // If impact filter is applied
        if (impactValues) {
          entries = entries.filter((entry) =>
            impactValues.includes(entry.importance),
          );
        }

        // Only add if any entries left
        if (entries.length > 0) {
          filteredData[dateKey] = entries;
        }
      }
    }

    return new Response(
      JSON.stringify({
        rc: "00",
        rd: "success",
        filteredAt: new Date().toISOString(),
        filters: { startDate, endDate, impact },
        data: filteredData,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error filtering data:", error);
    return new Response(
      JSON.stringify({
        rc: "05",
        rd: error,
        error: "Internal Server Error",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({
      rc: "05",
      rd: "404",
    }),
  );
}
