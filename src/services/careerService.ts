interface CareerFormData {
  position: string;
  department: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  resume: File | null;
  coverLetter: string;
}

export const submitCareerApplication = async (formData: CareerFormData) => {
  const API_URL = process.env.REACT_APP_CAREER_API_URL || 'http://localhost:5000/api/careers';
  
  try {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataObj.append(key, value);
      }
    });

    console.log('Submitting career application:', {
      url: API_URL,
      formData: Object.fromEntries(formDataObj.entries())
    });

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formDataObj,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to submit career application';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Career application submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error submitting career application:', error);
    throw error;
  }
};

export type { CareerFormData };
