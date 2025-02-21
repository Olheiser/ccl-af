// src/types.ts
export type CourtAppearance = {
  id?: string;
  lawyerName: string;
  email: string;
  phone?: string;
  contactMethod: string;
  date: string;
  time: string;
  courthouseName: string;
  province: string;
  courtroomNumber?: string;  // Optional
  typeOfAppearance?: string; // Optional
  accusedStatus?: string; // Optional
  designationStatus?: string; // Optional
  instructions?: string;     // Optional
  };