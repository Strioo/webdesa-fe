const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.18.3:5000/api';

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
  getByUserId: (userId: string) => apiClient.get(`/laporan/user/get/${userId}`),
  // ✅ NEW: Validate laporan dengan AI sebelum submit
  validate: async (formData: FormData) => {
    const token = getAuthToken();
    
    try {
      const response = await fetch(`${API_BASE_URL}/laporan/validate`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Validation failed');
      }

      return data;
    } catch (error) {
      console.error('Laporan validation error:', error);
      throw error;
    }
  },
  create: async (formData: FormData) => {
    const token = getAuthToken();
    
    try {
      const url = `${API_BASE_URL}/laporan/create`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(
          errorData.message || 'Failed to create laporan',
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },
  update: (id: string, data: any) => apiClient.put(`/laporan/update/${id}`, data),
  delete: (id: string) => apiClient.delete(`/laporan/delete/${id}`),
  updateStatus: (id: string, data: { status: string; tanggapan?: string }) => 
    apiClient.patch(`/laporan/status/${id}`, data),
};

export const wisataApi = {
  getAll: () => apiClient.get('/wisata/getall'),
  getById: (id: string) => apiClient.get(`/wisata/get/${id}`),
  getBySlug: (slug: string) => apiClient.get(`/wisata/slug/${slug}`),
  
  create: async (formData: FormData) => {
    const token = getAuthToken();
    
    try {
      const url = `${API_BASE_URL}/wisata/create`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to create wisata',
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  update: async (id: string, formData: FormData) => {
    const token = getAuthToken();
    
    try {
      const url = `${API_BASE_URL}/wisata/update/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to update wisata',
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  delete: (id: string) => apiClient.delete(`/wisata/delete/${id}`),
};

export const umkmApi = {
  getAll: () => apiClient.get('/umkm/getall'),
  getById: (id: string) => apiClient.get(`/umkm/get/${id}`),
  getBySlug: (slug: string) => apiClient.get(`/umkm/slug/${slug}`),
  
  // ✅ FIXED: Use FormData for create
  create: async (formData: FormData) => {
    const token = getAuthToken();
    
    try {
      const url = `${API_BASE_URL}/umkm/create`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          // Don't set Content-Type - let browser set it with boundary
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to create UMKM',
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  // ✅ FIXED: Use FormData for update
  update: async (id: string, formData: FormData) => {
    const token = getAuthToken();
    
    try {
      const url = `${API_BASE_URL}/umkm/update/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          // Don't set Content-Type - let browser set it with boundary
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to update UMKM',
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  delete: (id: string) => apiClient.delete(`/umkm/delete/${id}`),
};

export const transactionApi = {
  create: (data: any) => apiClient.post('/transactions/create', data),
  getById: (id: string) => apiClient.get(`/transactions/${id}`),
  getByOrderId: (orderId: string) => apiClient.get(`/transactions/order/${orderId}`),
  getAll: () => apiClient.get('/transactions/getall'),
  getMyTransactions: () => apiClient.get('/transactions/my-transactions'),
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
  
  create: async (formData: FormData) => {
    const token = getAuthToken();
    
    try {
      const url = `${API_BASE_URL}/program/create`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to create program',
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

  update: async (id: string, formData: FormData) => {
    const token = getAuthToken();
    
    try {
      const url = `${API_BASE_URL}/program/update/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to update program',
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  },

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
  // Public API untuk homepage hero section
  getHomeStats: () => apiClient.get('/dashboard/home-stats'),
  // Public API untuk StatistikDesa section
  getPublicStats: (timeRange?: string) => 
    apiClient.get(`/dashboard/public-stats${timeRange ? `?timeRange=${timeRange}` : ''}`),
  // ✅ NEW: Public API untuk UmkmDanWisata section
  getUmkmWisataStats: () => apiClient.get('/dashboard/umkm-wisata-stats'),
};