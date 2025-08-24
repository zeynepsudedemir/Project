import axios from 'axios';
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MOCK_AUTH_TOKEN = 'temporary-mock-token-12345';
/*export async function login({ username, password }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data.success; // Assuming the API returns a success field
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}*/
export const login=async({username,password})=>{
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const validUsername='admin';
    const validPassword='pass';
    if (username === validUsername && password === validPassword) {
    localStorage.setItem('authToken', MOCK_AUTH_TOKEN);
    return true; // Simulate successful login
  } else {
    console.error('Login failed: Invalid username or password');
    return false; // Simulate failed login
  }
}

export const signOut = () => {
  localStorage.removeItem('authToken'); // 'authToken' anahtarını kaldırır
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token; // 'authToken' öğesinin var olup olmadığını kontrol eder
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};