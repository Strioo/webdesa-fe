const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getAuthToken = () => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
    return authCookie ? authCookie.split('=')[1] : null;
  }
  return null;
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = {
  async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const token = getAuthToken();
      
      console.log('API Request:', {
        url,
        method: options.method || 'GET',
        hasToken: !!token,
        hasBody: !!options.body
      });
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new ApiError('Server returned non-JSON response', response.status);
      }

      console.log('API Response Data:', data);

      if (!response.ok) {
        throw new ApiError(
          data.message || `HTTP error! status: ${response.status}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      });
    }

    const token = getAuthToken();

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }
};

export const laporanApi = {
  getAll: () => apiClient.get('/laporan/getall'),
  getById: (id: string) => apiClient.get(`/laporan/get/${id}`),
  create: (data: any) => apiClient.post('/laporan/create', data),
  update: (id: string, data: any) => apiClient.put(`/laporan/update/${id}`, data),
  delete: (id: string) => apiClient.delete(`/laporan/delete/${id}`),
  // FIX: Kirim langsung sebagai object flat, bukan nested
  updateStatus: (id: string, data: { status: string; tanggapan?: string }) => 
    apiClient.patch(`/laporan/status/${id}`, data),
};

export const wisataApi = {
  getAll: () => apiClient.get('/wisata/getall'),
  getById: (id: string) => apiClient.get(`/wisata/get/${id}`),
  create: (data: any) => apiClient.post('/wisata/create', data),
  update: (id: string, data: any) => apiClient.put(`/wisata/update/${id}`, data),
  delete: (id: string) => apiClient.delete(`/wisata/delete/${id}`),
};

export const umkmApi = {
  getAll: () => apiClient.get('/umkm/getall'),
  getById: (id: string) => apiClient.get(`/umkm/get/${id}`),
  create: (data: any) => apiClient.post('/umkm/create', data),
  update: (id: string, data: any) => apiClient.put(`/umkm/update/${id}`, data),
  delete: (id: string) => apiClient.delete(`/umkm/delete/${id}`),
};

export const transactionApi = {
  getAll: () => apiClient.get('/transactions/getall'),
  getById: (id: string) => apiClient.get(`/transactions/${id}`),
  getMy: () => apiClient.get('/transactions/my-transactions'),
  create: (data: any) => apiClient.post('/transactions/create', data),
};

export const userApi = {
  getAll: () => apiClient.get('/users/get'),
  getById: (id: string) => apiClient.get(`/users/get/${id}`),
  create: (data: any) => apiClient.post('/users/create', data),
  update: (id: string, data: any) => apiClient.put(`/users/update/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/delete/${id}`),
};

export const programApi = {
  getAll: () => apiClient.get('/program/getall'),
  getById: (id: string) => apiClient.get(`/program/get/${id}`),
  create: (data: any) => apiClient.post('/program/create', data),
  update: (id: string, data: any) => apiClient.put(`/program/update/${id}`, data),
  delete: (id: string) => apiClient.delete(`/program/delete/${id}`),
};

export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/login', credentials),
  register: (userData: { 
    name: string; 
    email: string; 
    password: string; 
    role?: string;
    noTelp?: string;
    alamat?: string;
  }) => apiClient.post('/auth/register', userData),
  logout: () => apiClient.post('/auth/logout'),
  getProfile: () => apiClient.get('/auth/me'),
};

export const dashboardApi = {
  getStats: () => apiClient.get('/dashboard/stats'),
};