interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const submitContactForm = async (formData: ContactFormData) => {
  // Use the environment variable, fallback to localhost for development
  const API_URL = process.env.REACT_APP_CONTACT_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://your-server-domain.com/api/contact'  // Replace with your actual server domain
      : 'http://localhost:5000/api/contact');
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit contact form');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export type { ContactFormData };
