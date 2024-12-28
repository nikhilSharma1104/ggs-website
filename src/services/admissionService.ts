interface AdmissionFormData {
  studentName: string;
  grade: string;
  parentName: string;
  email: string;
  phone: string;
  message?: string;
}

export const submitAdmissionApplication = async (formData: AdmissionFormData) => {
  try {
    const response = await fetch('http://localhost:5000/api/admissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit application');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export type { AdmissionFormData };