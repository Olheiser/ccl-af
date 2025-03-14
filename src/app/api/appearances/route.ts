// pages/api/appearances.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/database/firebase';
import { collection, getDocs, query, where, orderBy, addDoc } from 'firebase/firestore';

interface CourtAppearance {
  lawyerName: string;
  email: string;
  province: string;
  courthouseName: string;
  date: string;
  time: string;
  courtroomNumber: string;
  typeOfAppearance: string;
  instructions: string;
}

// Helper function to validate court appearance data
function isCourtAppearance(data: unknown): data is CourtAppearance {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const appearance = data as CourtAppearance;
  return (
    typeof appearance.lawyerName === 'string' &&
    typeof appearance.email === 'string' &&
    typeof appearance.province === 'string' &&
    typeof appearance.courthouseName === 'string' &&
    typeof appearance.date === 'string' &&
    typeof appearance.time === 'string' &&
    typeof appearance.courtroomNumber === 'string' &&
    typeof appearance.typeOfAppearance === 'string' &&
    typeof appearance.instructions === 'string'
  );
}

// GET: Fetch all court appearances
// GET: Fetch all court appearances
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateFilter = searchParams.get('date'); // Filter by date
  const provinceFilter = searchParams.get('province'); // Filter by province
  const courthouseFilter = searchParams.get('courthouseName'); // Filter by courthouse
  //const excludePast = searchParams.get('excludePast') === 'true'; // Exclude past appearances
  const page = parseInt(searchParams.get('page') || '1'); // Pagination
  const pageSize = 20; // Number of items per page

  try {
    //let q = query(collection(db, 'appearances'), orderBy('date'));
    let q = query(collection(db, 'appearances'), orderBy('timestamp', 'desc')); // Order by timestamp in descending order

    /*if (excludePast) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      console.log(`Today: ${today}`)
      q = query(q, where('date', '>=', today)); // Only include appearances with dates >= today
    } else if (dateFilter) {
      q = query(q, where('date', '==', dateFilter)); // Filter by specific date
    }*/

    // Filter by date (only fetch future appearances)
    if (dateFilter) {
      console.log(`Route's Date filter: ${dateFilter}`)
    
      q = query(q, where('date', '==', dateFilter));    
    }

    // Filter by province
    if (provinceFilter) {
      console.log(`Route's Province filter: ${provinceFilter}`);
      q = query(q, where('province', '==', provinceFilter));
    }

    if (courthouseFilter) {
      console.log(`Route's Courthouse filter: ${courthouseFilter}`)

      q = query(q, where('courthouseName', '==', courthouseFilter));
    }

    // Pagination
    const snapshot = await getDocs(q);
    const totalItems = snapshot.size;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const appearances = snapshot.docs
      .slice(startIndex, endIndex)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

      console.log(`Fetched appearances: ${JSON.stringify(appearances)}`);

    return NextResponse.json({
      appearances,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch court appearances:', error);
    return NextResponse.json(
      { error: 'Failed to fetch court appearances' },
      { status: 500 }
    );
  }
}

// POST: Add a new court appearance
// POST: Add a new court appearance
export async function POST(request: Request) {
  try {
    console.log('Received request to add a new court appearance...');
    const body = await request.json();
    console.log('Request body:', body);

    if (!isCourtAppearance(body)) {
      console.error('Invalid court appearance data:', body);
      return NextResponse.json(
        { error: 'Invalid court appearance data' },
        { status: 400 }
      );
    }

    console.log('Adding new court appearance to Firestore...');
    const docRef = await addDoc(collection(db, 'appearances'), body);
    console.log('Successfully added court appearance with ID:', docRef.id);

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to add court appearance:', error);
    return NextResponse.json(
      { error: 'Failed to add court appearance' },
      { status: 500 }
    );
  }
}