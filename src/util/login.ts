export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    // Optionally include other data such as user info.
  }
  
  /**
   * Sends a login request to the backend.
   *
   * @param data - The login data containing email and password.
   * @returns The JSON response containing the JWT.
   * @throws An error if the API URL is missing or the login fails.
   */
  export async function loginUser(data: LoginData): Promise<LoginResponse> {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined in environment variables.');
    }
  
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }
  
    return response.json();
  }
  