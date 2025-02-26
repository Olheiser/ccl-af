import { useState } from 'react';
import styles from '@/styles/Calendar.module.css';
import { CourtAppearance } from '@/types';
import { formatDate, formatTimeTo12Hour, getCourtroomWithPrefix } from '@/app/util/util';

interface DayModalProps {
  appearances: CourtAppearance[];
  onClose: () => void;
}

export default function DayModal({ appearances, onClose }: DayModalProps) {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  const handleAccordionClick = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
  };

  const handleGroupClick = (id: string) => {
    setOpenGroupId((prevId) => (prevId === id ? null : id));
  };

  const handleOverlayClick = () => {
    onClose(); // Calls handleCloseAllModals, closing everything
  };

  // Group appearances by courthouseName
  const groupedAppearances = appearances.reduce((acc, appearance) => {
    const courthouse = appearance.courthouseName;
    if (!acc[courthouse]) {
      acc[courthouse] = [];
    }
    acc[courthouse].push(appearance);
    return acc;
  }, {} as Record<string, CourtAppearance[]>);

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h2 className={styles.dayModalHeader}>Appearance Requests on<br/>{formatDate(appearances[0].date)}</h2>
        
        {Object.entries(groupedAppearances).map(([courthouse, appearancesInCourthouse]) => (
          <div key={courthouse}>
            {appearancesInCourthouse.length > 1 ? (
              // Render as a group if there are multiple appearances for this courthouse
              <div className={styles.accordion}>
                <div
                  className={`${styles.accordionHeader} ${styles.parentAccordionHeader}`}
                  onClick={() => handleGroupClick(courthouse)}
                >
                  <span>
                  <strong>{appearancesInCourthouse.length} Appearance Requests in {courthouse} ▿</strong> 
                  </span>
                </div>
                {openGroupId === courthouse && (
                  <div className={styles.accordionContent}>
                    {appearancesInCourthouse.map((appearance) => (
                      <div key={appearance.id} className={`${styles.accordion} ${styles.childAccordion}`}>
                        <div
                          className={styles.accordionHeader}
                          onClick={() => handleAccordionClick(appearance.id!)}
                        >
                          <span>
                            <strong>{appearance.lawyerName} in {appearance.courthouseName} {getCourtroomWithPrefix(appearance.courtroomNumber)} at {formatTimeTo12Hour(appearance.time)} ▿</strong>
                          </span>
                        </div>
                        {openAccordionId === appearance.id && (
                          <div className={styles.accordionContent}>
                            <p><strong>Courthouse:</strong> {appearance.courthouseName}, {appearance.province}</p>
                            {appearance.courtroomNumber && <p><strong>Courtroom:</strong> {getCourtroomWithPrefix(appearance.courtroomNumber)}</p>}
                            <p><strong>Appearance Date:</strong> {formatDate(appearance.date)} at {formatTimeTo12Hour(appearance.time)}</p>
                            <p><strong>Requesting Lawyer:</strong> {appearance.lawyerName}</p>
                            <p><strong>Requesting Lawyer&apos;s Email:</strong> <a className={styles.modalEmail} href={`mailto:${appearance.email}`}>{appearance.email}</a></p>
                            {appearance.phone && <p><strong>Requesting Lawyer&apos;s Phone Number:</strong> {appearance.phone}</p>}
                            <p><strong>Preferred Contact Method:</strong> {appearance.contactMethod}</p>
                            {appearance.typeOfAppearance && <p><strong>Type of Appearance:</strong> {appearance.typeOfAppearance}</p>}
                            {appearance.accusedStatus && <p><strong>Will the Accused be Present?</strong> {appearance.accusedStatus}</p>}
                            {appearance.designationStatus && <p><strong>Has a Designation Been Filed With the Court?</strong> {appearance.designationStatus}</p>}
                            {appearance.instructions && <p><strong>Instructions:</strong> {appearance.instructions}</p>}
                            <div className={styles.modalEmailContainer}>
                              <a href={`mailto:${appearance.email}`}>
                                <span className={styles.modalEmailButton}>Email {appearance.lawyerName}</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Render as a single item if there's only one appearance for this courthouse
              <div key={appearancesInCourthouse[0].id} className={`${styles.accordion} ${styles.singleAccordion}`}>
                <div
                  className={styles.accordionHeader}
                  onClick={() => handleAccordionClick(appearancesInCourthouse[0].id!)}
                >
                  <span>
                    <strong>{appearancesInCourthouse[0].lawyerName} in {appearancesInCourthouse[0].courthouseName} {getCourtroomWithPrefix(appearancesInCourthouse[0].courtroomNumber)} at {formatTimeTo12Hour(appearancesInCourthouse[0].time)} ▿</strong>
                  </span>
                </div>
                {openAccordionId === appearancesInCourthouse[0].id && (
                  <div className={styles.accordionContent}>
                    <p><strong>Courthouse:</strong> {appearancesInCourthouse[0].courthouseName}, {appearancesInCourthouse[0].province}</p>
                    {appearancesInCourthouse[0].courtroomNumber && <p><strong>Courtroom:</strong> {getCourtroomWithPrefix(appearancesInCourthouse[0].courtroomNumber)}</p>}
                    <p><strong>Appearance Date:</strong> {formatDate(appearancesInCourthouse[0].date)} at {formatTimeTo12Hour(appearancesInCourthouse[0].time)}</p>
                    <p><strong>Requesting Lawyer:</strong> {appearancesInCourthouse[0].lawyerName}</p>
                    <p><strong>Requesting Lawyer&apos;s Email:</strong> <a className={styles.modalEmail} href={`mailto:${appearancesInCourthouse[0].email}`}>{appearancesInCourthouse[0].email}</a></p>
                    {appearancesInCourthouse[0].phone && <p><strong>Requesting Lawyer&apos;s Phone Number:</strong> {appearancesInCourthouse[0].phone}</p>}
                    <p><strong>Preferred Contact Method:</strong> {appearancesInCourthouse[0].contactMethod}</p>
                    {appearancesInCourthouse[0].typeOfAppearance && <p><strong>Type of Appearance:</strong> {appearancesInCourthouse[0].typeOfAppearance}</p>}
                    {appearancesInCourthouse[0].accusedStatus && <p><strong>Will the Accused be Present?</strong> {appearancesInCourthouse[0].accusedStatus}</p>}
                    {appearancesInCourthouse[0].designationStatus && <p><strong>Has a Designation Been Filed With the Court?</strong> {appearancesInCourthouse[0].designationStatus}</p>}
                    {appearancesInCourthouse[0].instructions && <p><strong>Instructions:</strong> {appearancesInCourthouse[0].instructions}</p>}
                    <div className={styles.modalEmailContainer}>
                      <a href={`mailto:${appearancesInCourthouse[0].email}`}>
                        <span className={styles.modalEmailButton}>Email {appearancesInCourthouse[0].lawyerName}</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}