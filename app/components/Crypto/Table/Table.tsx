import { Table } from "@radix-ui/themes";
import moment from "moment";

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
  importance?: number | string;
  lastUpdate?: string;
  revised?: string;
  currency?: string;
  unit?: string;
  ticker?: string;
  symbol?: string;
};

type EcoTableProps = {
  data?: Record<string, CalendarData[]>;
};

export default function EcoTable({ data }: EcoTableProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 p-8 mt-12 lg:mt-36">
        <p className="text-lg font-semibold">No Data Available</p>
        <p className="mt-2">Please check back later your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([date, items]) => (
        <div key={date}>
          <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {moment(date).format("MMMM D, YYYY")}
            </h2>
          </div>

          <Table.Root className="w-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Currency</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Impact</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell colSpan={4}>
                  Detail
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actual</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Forecast</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Previous</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Consensus</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map((item, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell>{item.date?.split(" ")[1] || "-"}</Table.Cell>
                  <Table.Cell>{"🇺🇸 US"}</Table.Cell>
                  <Table.Cell>
                    {item.importance == "1" ? (
                      <span className="text-xs font-bold bg-green-100 px-4 py-1 rounded-full text-green-400">
                        Low
                      </span>
                    ) : item.importance == "2" ? (
                      <span className="text-xs font-bold bg-yellow-100 px-4 py-1 rounded-full text-yellow-400">
                        Medium
                      </span>
                    ) : item.importance == "3" ? (
                      <span className="text-xs font-bold bg-red-100 px-4 py-1 rounded-full text-red-400">
                        High
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </Table.Cell>
                  <Table.Cell colSpan={4}>
                    <div className="font-medium">{item.event}</div>
                    <div className="text-sm text-gray-500">
                      {item.category}{" "}
                      {item.reference ? `(${item.reference})` : ""}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{item.actual || "-"}</Table.Cell>
                  <Table.Cell>{item.forecast || "-"}</Table.Cell>
                  <Table.Cell>{item.previous || "-"}</Table.Cell>
                  <Table.Cell>{item.teForecast || "-"}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      ))}
    </div>
  );
}
