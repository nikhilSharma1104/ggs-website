interface AdmissionFormData {
  studentName: string;
  grade: string;
  parentName: string;
  email: string;
  phone: string;
  message?: string;
}

export const submitAdmissionApplication = async (formData: AdmissionFormData) => {
  const API_URL = process.env.REACT_APP_ADMISSION_API_URL || 'https://ggs-website-api.onrender.com/api/admissions';
  
  try {
    console.log('Submitting to:', API_URL);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      if (response.headers.get('content-type')?.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      } else {
        const errorText = await response.text();
        console.error('Non-JSON error response:', errorText);
        throw new Error('Failed to submit application. Server returned an invalid response.');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export type { AdmissionFormData };