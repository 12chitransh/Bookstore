// API utility for centralized endpoint management
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Books endpoints
  async getBooks(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/books?${queryString}` : '/api/books';
    return this.request(endpoint);
  }

  async getBook(id) {
    return this.request(`/api/books/${id}`);
  }

  // Orders endpoints
  async createOrder(orderData) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders() {
    return this.request('/api/orders');
  }

  async getOrder(id) {
    return this.request(`/api/orders/${id}`);
  }

  // Payments endpoints
  async createPaymentIntent(paymentData) {
    return this.request('/api/payments/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async confirmPayment(confirmationData) {
    return this.request('/api/payments/confirm-payment', {
      method: 'POST',
      body: JSON.stringify(confirmationData),
    });
  }

  async getPaymentHistory() {
    return this.request('/api/payments/history');
  }

  // Admin endpoints
  async adminLogin(credentials) {
    return this.request('/api/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verifyAdmin() {
    return this.request('/api/admin/verify');
  }

  async getAdminStats() {
    return this.request('/api/admin/stats');
  }

  async getAdminBooks() {
    return this.request('/api/admin/books');
  }

  async createAdminBook(bookData) {
    return this.request('/api/admin/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  }

  async updateAdminBook(id, bookData) {
    return this.request(`/api/admin/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  }

  async deleteAdminBook(id) {
    return this.request(`/api/admin/books/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminUsers() {
    return this.request('/api/admin/users');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for custom instances if needed
export default ApiClient;