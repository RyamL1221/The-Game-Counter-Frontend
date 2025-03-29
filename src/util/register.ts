export interface RegisterData {
    email: string;
    password: string;
  }
  
  /**
   * Sends a registration request to the backend.
   *
   * @param formData - The registration data containing email and password.
   * @returns The response data from the API.
   * @throws An error if the API URL is not defined or the registration fails.
   */
  export async function registerUser(formData: RegisterData): Promise<any> {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined in environment variables.');
    }
  
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }
  
    return await response.json();
  }
  