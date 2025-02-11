"use client"

import React, { useState, useEffect } from "react";
import styles from "@/styles/RequestFeed.module.css";
import Appearance from "../components/Appearance";
import Filter from "../components/Filter";

  interface CourtAppearance {
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
  }
  
  export default function Page() {
    const [appearances, setAppearances] = useState<CourtAppearance[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
    const [provinceFilter, setProvinceFilter] = useState<string | undefined>(undefined);
  
    const fetchAppearances = async (page: number = 1, dateFilter?: string, provinceFilter?: string) => {
      const url = `/api/appearances?page=${page}&date=${dateFilter || ''}&province=${provinceFilter || ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch court appearances');
      }
      return response.json();
    };
  
    const loadAppearances = async () => {
      try {
        const data = await fetchAppearances(page, dateFilter, provinceFilter);
        setAppearances(data.appearances);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
  
    // Auto-refresh every minute
    useEffect(() => {
      loadAppearances();
      const interval = setInterval(loadAppearances, 60000); // Refresh every 60 seconds
      return () => clearInterval(interval);
    }, [page, dateFilter, provinceFilter]);
  
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
  
    return (
      <main className={styles.pageBody}>
        <div className={styles.pageContainer}>
          <article className={styles.pageContent}>
            <h1 className={styles.title}>Appearance Requests</h1>
            {appearances.map((appearance) => (
              <Appearance key={appearance.id} appearance={appearance} />
            ))}
            {appearances.length > 15 && (
              <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={page === 1}>
                  Previous
                </button>
                <span className={styles.paginationCrumb}>Page {page} of {totalPages}</span>
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
            />
          </aside>
        </div>
      </main>
    );
  }