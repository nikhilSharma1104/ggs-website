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

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formDataObj,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit career application');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting career application:', error);
    throw error;
  }
};

export type { CareerFormData };
