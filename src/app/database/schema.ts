export interface CourtAppearance {
    id?: string; // Firebase will auto-generate this
    lawyerName: string;
    email: string;
    phone: string;
    contactMethod: string;
    province: string;
    courthouseName: string;
    date: string; // ISO format (e.g., "2023-10-25")
    time: string;
    courtroomNumber: string;
    typeOfAppearance: string;
    instructions: string;
  }

