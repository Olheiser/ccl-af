//import {useState} from 'react';
//import { getMonth } from "../util/util";
import type { Metadata } from "next";
import styles from "@/styles/Calendar.module.css";
import Calendar from '../components/Calendar/Calender';

export const metadata: Metadata = {
    title: "Agent Finder | Request Feed",
    description: "Nicholas Robinson is a trusted criminal lawyer in Regina, Saskatchewan, offering personalized and strategic criminal defence services. Call (306) 994-8323 for a free consultation today.",
  };

  
export default function Page() {
    //const [currentMonth, setCurrentMonth] = useState(getMonth());
    //const { monthIndex, showEventModal } = useContext(GlobalContext)

    /*useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
      }, [monthIndex])*/

// src/types.ts

      const dummyCourtAppearances = [
        {
          id: 1,
          date: '2025-02-10', // YYYY-MM-DD format
          title: 'Case #12345',
          caseName: "paul vs walker",
          details: 'Hearing for John Doe - Charge: Speeding',
          location: 'Regina Provincial Court',
          time: '10:00 AM',
        },
        {
          id: 2,
          date: '2025-02-11',
          title: 'Case #67890',
          caseName: "peter vs griffin",
          details: 'Trial for Jane Smith - Charge: Theft',
          location: 'Saskatoon Kings Bench',
          time: '2:00 PM',
        },
        {
          id: 3,
          date: '2025-02-12',
          title: 'Case #54321',
          caseName: "jake vs sanders",
          details: 'Preliminary Hearing for Bob Johnson - Charge: Assault',
          location: 'Weyburn Provincial Court',
          time: '9:30 AM',
        },
        {
          id: 4,
          date: '2025-02-13',
          title: 'Case #98765',
          caseName: "kierra vs knightly",
          details: 'Sentencing for Alice Brown - Charge: Fraud',
          location: 'Regina Provincial Court',
          time: '11:00 AM',
        },
        {
          id: 5,
          date: '2025-02-14',
          title: 'Case #11223',
          caseName: "serena vs williams",
          details: 'Bail Hearing for Charlie Davis - Charge: DUI',
          location: 'Saskatoon Kings Bench',
          time: '3:30 PM',
        },
        {
          id: 6,
          date: '2025-02-17',
          title: 'Case #44556',
          caseName: "laura vs becker",
          details: 'Trial for Emily White - Charge: Burglary',
          location: 'Weyburn Provincial Court',
          time: '1:00 PM',
        },
      ];

    return (
        <main className={styles.pageBody}>
            <div className={styles.pageContainer}>
                <Calendar courtAppearances={dummyCourtAppearances}/>
            </div>
        </main>
    )
}