"use client"

import React, { useState, useEffect } from "react";
import styles from "@/styles/RequestFeed.module.css";
import Appearance from "../components/Appearance";
import Filter from "../components/Filter";
import { CourtAppearance } from "@/types";

  /*interface CourtAppearance {
    id: string;
    lawyerName: string;
    email: string;
    date: string;
    time: string;
    courthouseName: string;
    courtroomNumber: string;
    typeOfAppearance: string;
    instructions: string;
    province: string;
  }*/
  
  export default function Page() {
    const [appearances, setAppearances] = useState<CourtAppearance[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
    const [provinceFilter, setProvinceFilter] = useState<string | undefined>(undefined);
    const [courthouseFilter, setCourthouseFilter] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true); // 

    const fetchAppearances = async (page: number = 1, dateFilter?: string, provinceFilter?: string, courthouseFilter?: string) => {
      const encodedCourthouseFilter = courthouseFilter ? encodeURIComponent(courthouseFilter) : "";
      const url = `/api/appearances?page=${page}&date=${dateFilter || ""}&province=${provinceFilter || ""}&courthouseName=${encodedCourthouseFilter || ""}`;
      console.log(`Courthouse Filter: ${courthouseFilter}`);
      console.log(`Encoded Courthouse Filter: ${encodedCourthouseFilter}`);
      console.log(`URL string: ${url}`)
      const response = await fetch(url);
      console.log(`url object: ${response.json}`)
      if (!response.ok) {
        throw new Error('Failed to fetch court appearances');
      }
      return response.json();
    };
  
    const loadAppearances = async () => {
      setLoading(true); //
      try {
        const data = await fetchAppearances(page, dateFilter, provinceFilter, courthouseFilter);
        setAppearances(data.appearances);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    // Auto-refresh every minute
    useEffect(() => {
      loadAppearances();
      const interval = setInterval(loadAppearances, 60000); // Refresh every 60 seconds
      return () => clearInterval(interval);
    }, [page, dateFilter, provinceFilter, courthouseFilter]);
  
    // Handle pagination
    const handleNextPage = () => {
      if (page < totalPages) {
        setPage(page + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (page > 1) {
        setPage(page - 1);
      }
    };
  
    // Handle date filter change
    const handleDateFilterChange = (date: string) => {
      setDateFilter(date);
      setPage(1); // Reset to the first page when the filter changes
    };
  
    // Handle province filter change
    const handleProvinceFilterChange = (province: string) => {
      setProvinceFilter(province);
      setPage(1); // Reset to the first page when the filter changes
    };

    const handleCourthouseFilterChange = (courthouse: string) => {
      setCourthouseFilter(courthouse);
      setPage(1);
    }
  
    return (
      <main className={styles.pageBody}>
      <div className={styles.pageContainer}>
        <article className={styles.pageContent}>
          <h1 className={styles.title}>Appearance Requests</h1>
          {loading ? (
            <div className={styles.loader}></div>
          ) : (
            appearances.map((appearance) => (
              <Appearance key={appearance.id!} appearance={appearance as Required<CourtAppearance>} />
            ))
          )}
          {appearances.length > 15 && (
            <div className={styles.pagination}>
              <button onClick={handlePrevPage} disabled={page === 1}>
                Previous
              </button>
              <span className={styles.paginationCrumb}>
                Page {page} of {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={page === totalPages}>
                Next
              </button>
            </div>
          )}
        </article>
        <aside className={styles.form}>
          <Filter
            onDateFilterChange={handleDateFilterChange}
            onProvinceFilterChange={handleProvinceFilterChange}
            onCourthouseChange={handleCourthouseFilterChange}
          />
        </aside>
      </div>
    </main>
    );
  }