"use client";

import { useEffect, useState } from "react";
import { LayoutMain } from "../components/layouts/LayoutMain";
import { Box, Spinner, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import styles from "@/app/modules/main.module.css";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import EcoTable from "../components/Crypto/Table/Table";
import moment from "moment";
import axios from "axios";

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

export default function Crypto() {
  const [data, setData] = useState<CalendarGroupedData>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Active filter state
  const [pickMode, setPickMode] = useState<
    "today" | "thisWeek" | "nextWeek" | "custom"
  >("nextWeek");
  const [pickDate, setPickDate] = useState<Date | undefined>(new Date());

  const thisWeekStart = moment().format("YYYY-MM-DD");
  const thisWeekEnd = moment().add(7, "days").format("YYYY-MM-DD");

  const [pick, setPick] = useState<{ startDate: string; endDate: string }>({
    startDate: thisWeekStart,
    endDate: thisWeekEnd,
  });

  const fetchData = async (startDate: string, endDate: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/economy", {
        startDate,
        endDate,
      });

      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching economy data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Crypto";
    fetchData(pick.startDate, pick.endDate);
  }, [pick]);

  const handleToday = () => {
    const today = moment().format("YYYY-MM-DD");
    setPick({ startDate: today, endDate: today });
    setPickMode("today");
  };

  const handleThisWeek = () => {
    setPick({ startDate: thisWeekStart, endDate: thisWeekEnd });
    setPickMode("thisWeek");
  };

  const handleNextWeek = () => {
    const start = moment()
      .add(1, "week")
      .startOf("isoWeek")
      .format("YYYY-MM-DD");
    const end = moment().add(1, "week").endOf("isoWeek").format("YYYY-MM-DD");
    setPick({ startDate: start, endDate: end });
    setPickMode("nextWeek");
  };

  const handleDatePick = (date: Date | undefined) => {
    if (date) {
      const formatted = moment(date).format("YYYY-MM-DD");
      setPick({ startDate: formatted, endDate: formatted });
      setPickDate(date);
      setPickMode("custom");
    }
  };

  const isActive = (mode: typeof pickMode) =>
    pickMode === mode ? "bg-blue-500 text-white hover:bg-blue-600" : "";

  return (
    <LayoutMain>
      <Box className="w-full px-2 lg:px-12 py-0">
        <div className="grid grid-cols-1">
          <Box className="px-2 lg:px-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              Economic Calendar
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-300">
              This section will display the economic calendar data.
            </p>
            {/* Filter Buttons and Date Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full">
              <Button
                size="lg"
                variant="secondary"
                className={`w-full cursor-pointer ${isActive("today")}`}
                onClick={handleToday}
              >
                <Text as="span" className={styles.body_font}>
                  Today
                </Text>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className={`w-full cursor-pointer ${isActive("thisWeek")}`}
                onClick={handleThisWeek}
              >
                <Text as="span" className={styles.body_font}>
                  This Week
                </Text>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className={`w-full cursor-pointer ${isActive("nextWeek")}`}
                onClick={handleNextWeek}
              >
                <Text as="span" className={styles.body_font}>
                  Next Week
                </Text>
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal cursor-pointer ${isActive("custom")}`}
                  >
                    <span className="mr-auto text-sm">{pick.startDate}</span>
                    <CalendarIcon className="ml-2 h-4 w-4 opacity-60" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={pickDate}
                    onSelect={handleDatePick}
                    captionLayout="dropdown"
                    className="bg-white dark:bg-gray-900 rounded"
                    disabled={(date) =>
                      date < new Date("1900-01-01") ||
                      date > new Date("2100-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Box className="mt-12">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">
                    <Spinner size="3" />
                  </p>
                  <div>Loading....</div>
                </div>
              ) : (
                <EcoTable data={data} />
              )}
            </Box>
          </Box>
        </div>
      </Box>
    </LayoutMain>
  );
}
