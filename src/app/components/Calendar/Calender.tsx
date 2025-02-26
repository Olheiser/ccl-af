// components/Calendar.tsx
"use client";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import { CourtAppearance } from "@/types";
import styles from "@/styles/Calendar.module.css";
import { findProvince } from "@/app/util/util";

interface CalendarProps {
  courtAppearances?: CourtAppearance[]; // Make it optional if not passed from parent
}

export default function Calendar({ courtAppearances: initialAppearances = [] }: CalendarProps) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [provinceFilter, setProvinceFilter] = useState<string>("");
  const [courthouseFilter, setCourthouseFilter] = useState<string | undefined>(undefined);
  const [appearances, setAppearances] = useState<CourtAppearance[]>(initialAppearances);
  

  const fetchAppearances = async (dateFilter?: string, provinceFilter?: string, courthouseFilter?: string) => {
    const encodedCourthouseFilter = courthouseFilter ? encodeURIComponent(courthouseFilter) : "";
    const url = `/api/appearances?date=${dateFilter || ""}&province=${provinceFilter || ""}&courthouseName=${encodedCourthouseFilter || ""}`;
    console.log(`Courthouse Filter: ${courthouseFilter}`);
    console.log(`Encoded Courthouse Filter: ${encodedCourthouseFilter}`);
    console.log(`URL string: ${url}`)
    const response = await fetch(url);
    console.log(`url object: ${response.json}`);
    if (!response.ok) {
      throw new Error("Failed to fetch court appearances");
    }
    return response.json();
  };

  const loadAppearances = async () => {
    try {
      const data = await fetchAppearances(undefined, provinceFilter, courthouseFilter);
      setAppearances(data.appearances);
    } catch (error) {
      console.error(error);
    }
  };

  // Auto-refresh every minute
  useEffect(() => {
    loadAppearances();
    const interval = setInterval(loadAppearances, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, [provinceFilter, courthouseFilter]);

  const handleProvinceFilterChange = (province: string) => {
    setProvinceFilter(province);
  };

  const handleCourthouseFilterChange = (courthouse: string) => {
    setCourthouseFilter(courthouse);
    const province = findProvince(courthouse) || "";
    setProvinceFilter(province);
  }

  const currentMonth = getMonth(monthIndex);

  function getMonth(month = dayjs().month()) {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });
    return daysMatrix;
  }

  return (
    <div className={styles.calendarContainer}>
      <CalendarHeader
        monthIndex={monthIndex}
        setMonthIndex={setMonthIndex}
        onProvinceFilterChange={handleProvinceFilterChange}
        onCourthouseChange={handleCourthouseFilterChange}
      />
      {/* Weekday Row */}
      <div className={styles.weekdayRow}>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
      </div>
      {/* Month Grid */}
      <div className={styles.monthGrid}>
        <Month month={currentMonth} courtAppearances={appearances} />
      </div>
    </div>
  );
}