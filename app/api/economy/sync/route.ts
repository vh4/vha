"use server";

import puppeteer from "puppeteer";
import moment from "moment-timezone";
import fs from "fs/promises";
import path from "path";

// Define types for scraped data
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

export async function GET(): Promise<Response> {
  try {
    const startDate = moment().format("YYYY-MM-DD");
    const endDate = moment().add(1, "year").format("YYYY-MM-DD");

    // Launch Puppeteer in headless mode
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const targetUrl = `${process.env.URL_API}/${startDate}/${endDate}?c=${process.env.SECRET_KEYS_API}`;
    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

    // Scrape table data
    const tableData: CalendarData[] = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("table tbody tr"));
      return rows.map((row) => {
        const columns = Array.from(row.querySelectorAll("td"));
        return {
          calendarId: columns[0]?.textContent?.trim(),
          date: columns[1]?.textContent?.trim(),
          country: columns[2]?.textContent?.trim(),
          category: columns[3]?.textContent?.trim(),
          event: columns[4]?.textContent?.trim(),
          reference: columns[5]?.textContent?.trim(),
          referenceDate: columns[6]?.textContent?.trim(),
          source: columns[7]?.textContent?.trim(),
          sourceUrl: columns[8]?.textContent?.trim(),
          actual: columns[9]?.textContent?.trim(),
          previous: columns[10]?.textContent?.trim(),
          forecast: columns[11]?.textContent?.trim(),
          teForecast: columns[12]?.textContent?.trim(),
          url: columns[13]?.textContent?.trim(),
          dateSpan: columns[14]?.textContent?.trim(),
          importance: columns[15]?.textContent?.trim(),
          lastUpdate: columns[16]?.textContent?.trim(),
          revised: columns[17]?.textContent?.trim(),
          currency: columns[18]?.textContent?.trim(),
          unit: columns[19]?.textContent?.trim(),
          ticker: columns[20]?.textContent?.trim(),
          symbol: columns[21]?.textContent?.trim(),
        };
      });
    });

    await browser.close();

    // Save to JSON file
    // Tentukan path folder dan file
    const dirPath = path.join(process.cwd(), "data");
    const filePath = path.join(dirPath, "economy-calendar.json");

    // Buat folder jika belum ada
    await fs.mkdir(dirPath, { recursive: true });

    //groub by date.
    const groupedData: Record<string, CalendarData[]> = {};

    tableData.forEach((item) => {
      const rawDate = item.date ?? null;
      const formattedDate = rawDate
        ? moment(rawDate, "M/D/YYYY h:mm:ss A").format("YYYY-MM-DD")
        : "";
      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = [];
      }
      groupedData[formattedDate].push(item);
    });

    // Simpan file
    await fs.writeFile(filePath, JSON.stringify(groupedData, null, 2), "utf8");
    // Return response
    return new Response(
      JSON.stringify({
        rc: "00",
        rd: "success",
        fetchedAt: new Date().toISOString(),
        data: groupedData,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching calendar data:", error);
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
