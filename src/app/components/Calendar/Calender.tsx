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
    console.log(`Starting getMonth with month: ${month}, month name: ${dayjs().month(month).format('MMMM')}`);
  
    const year = dayjs().year();
    console.log(`Current year being used: ${year}`);
  
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    console.log(`First day of the month falls on: ${firstDayOfTheMonth} (0=Sunday, 6=Saturday)`);
  
    let currentMonthCount = 0 - firstDayOfTheMonth;
    console.log(`Starting currentMonthCount: ${currentMonthCount}`);
  
    // Create a 5x7 grid (5 rows, 7 days per week)
    const daysMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });
    console.log('Initial daysMatrix (5x7 grid with all days):', daysMatrix.map(row => row.map(day => day.format('YYYY-MM-DD'))));
  
    // Filter out weekends (Saturday and Sunday)
    const filteredMatrix = daysMatrix.map((row) =>
      row.filter((day, idx) => idx !== 0 && idx !== 6)
    );
    console.log('filteredMatrix after removing weekends:', filteredMatrix.map(row => row.map(day => day.format('YYYY-MM-DD'))));
  
    // Check if the first row contains any days from the current month
    const firstRowHasCurrentMonthDays = filteredMatrix[0].some((day) => day.month() === month);
    console.log(`First row has current month days: ${firstRowHasCurrentMonthDays}`);
    console.log('First row months:', filteredMatrix[0].map(day => day.month()));
    console.log('Target month:', month);
  
    // If the first row doesn't contain any days from the current month, remove it
    if (!firstRowHasCurrentMonthDays) {
      console.log('Removing first row because it contains no days from the current month');
      filteredMatrix.shift();
      console.log('Matrix after removing first row:', filteredMatrix.map(row => row.map(day => day.format('YYYY-MM-DD'))));
    }
  
    // Check if the last day of the month is missing
    const lastDayOfMonth = dayjs(new Date(year, month + 1, 0));
    console.log(`Last day of month: ${lastDayOfMonth.format('YYYY-MM-DD')}`);
  
    const lastDayInMatrix = filteredMatrix[filteredMatrix.length - 1][filteredMatrix[filteredMatrix.length - 1].length - 1];
    console.log(`Last day in matrix: ${lastDayInMatrix.format('YYYY-MM-DD')}`);
    console.log(`Is last day of month in matrix: ${lastDayInMatrix.isSame(lastDayOfMonth, 'day')}`);
  
    // Only add an additional row if the last day of the month is not already in the matrix
    if (!lastDayInMatrix || !lastDayInMatrix.isSame(lastDayOfMonth, 'day')) {
      console.log('Last day of month is missing. Adding additional row.');
      // Add an additional row if the last day of the month is missing
      const additionalRow = [];
      while (additionalRow.length < 5) {
        currentMonthCount++;
        const day = dayjs(new Date(year, month, currentMonthCount));
        if (day.day() !== 0 && day.day() !== 6) { // Exclude weekends
          additionalRow.push(day);
        }
      }
      console.log('Additional row days:', additionalRow.map(day => day.format('YYYY-MM-DD')));
  
      // Only add the additional row if it contains days from the current month
      const hasCurrentMonthDays = additionalRow.some((day) => day.month() === month);
      console.log(`Additional row has current month days: ${hasCurrentMonthDays}`);
      console.log('Additional row months:', additionalRow.map(day => day.month()));
  
      if (hasCurrentMonthDays) {
        console.log('Adding additional row to matrix');
        filteredMatrix.push(additionalRow);
      } else {
        console.log('Not adding additional row because it contains no days from current month');
      }
    }
  
    console.log('Final matrix:', filteredMatrix.map(row => row.map(day => day.format('YYYY-MM-DD'))));
    console.log(`Final matrix row count: ${filteredMatrix.length}`);
    return filteredMatrix;
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