import axios from 'axios';

export interface SheetEvent {
  date: string;
  title: string;
  description?: string;
}

const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const RANGE = 'A2:C'; // Assuming columns A=Date, B=Title, C=Description, starting from row 2

export const fetchEventsFromSheet = async (): Promise<SheetEvent[]> => {
  try {
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
    );

    const rows = response.data.values || [];
    
    return rows.map((row: any[]) => ({
      date: row[0] || '',
      title: row[1] || '',
      description: row[2] || undefined,
    }));
  } catch (error) {
    console.error('Error fetching events from Google Sheet:', error);
    return [];
  }
};
