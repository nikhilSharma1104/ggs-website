import axios from 'axios';

export interface SheetEvent {
  date: string;
  title: string;
  description?: string;
}

const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const fetchEventsFromSheet = async (): Promise<SheetEvent[]> => {
  if (!SHEET_ID || !API_KEY) {
    throw new Error('Google Sheets configuration is missing. Please check your environment variables.');
  }

  try {
    // Directly fetch values from the first sheet
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A2:C?key=${API_KEY}`
    );

    console.log('Raw response:', JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.values) {
      console.warn('No data found in the spreadsheet');
      return [];
    }

    const events = response.data.values
      .filter((row: any[]) => {
        if (!Array.isArray(row) || row.length < 2) {
          console.warn('Invalid row format:', row);
          return false;
        }
        
        const dateStr = row[0];
        if (!dateStr) {
          console.warn('Empty date field:', row);
          return false;
        }

        // Try to parse the date
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            console.warn('Invalid date format:', dateStr);
            return false;
          }
          return true;
        } catch (err) {
          console.warn('Error parsing date:', dateStr, err);
          return false;
        }
      })
      .map((row: any[]) => ({
        date: row[0],
        title: row[1] || 'Untitled Event',
        description: row[2] || undefined,
      }));

    console.log('Parsed events:', events);
    return events;

  } catch (error: any) {
    console.error('Google Sheets API Error:', {
      error: error,
      response: error.response?.data,
      status: error.response?.status
    });

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || error.message;
      
      if (error.response?.status === 403) {
        throw new Error(
          'Access denied. Please check:\n' +
          '1. Google Sheets API is enabled in Google Cloud Console\n' +
          '2. API key has access to Google Sheets API\n' +
          '3. Spreadsheet is shared with "Anyone with the link"\n\n' +
          'Error: ' + errorMessage
        );
      }
      
      if (error.response?.status === 404) {
        throw new Error(
          'Spreadsheet not found. Please check the spreadsheet ID.\n' +
          'Current ID: ' + SHEET_ID + '\n\n' +
          'Error: ' + errorMessage
        );
      }
      
      throw new Error('API Error: ' + errorMessage);
    }
    
    throw error;
  }
};
