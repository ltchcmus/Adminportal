import axios from "axios";

// Configure base URL from environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.status, error.response.data);
      throw new Error(
        error.response.data.message || "Đã có lỗi xảy ra từ server"
      );
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.request);
      throw new Error(
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
      );
    } else {
      // Something else happened
      console.error("Error:", error.message);
      throw new Error(error.message || "Đã có lỗi không xác định");
    }
  }
);

/**
 * Request a trial code
 * @param {string} nameCompany - Company or personal name
 * @param {string} email - User email
 * @param {string} cccd - CCCD/CMND number
 * @returns {Promise<Object>} Response with code and expiry
 */
export const requestTrialCode = async (nameCompany, email, cccd) => {
  const response = await apiClient.post("/api/request-trial", {
    nameCompany,
    email,
    cccd,
  });
  return response.data;
};

/**
 * Request a premium code (initiates payment)
 * @param {string} nameCompany - Company or personal name
 * @param {string} email - User email
 * @param {string} cccd - CCCD/CMND number
 * @returns {Promise<Object>} Response with payment URL
 */
export const requestPremiumCode = async (nameCompany, email, cccd) => {
  const response = await apiClient.post("/api/request-premium", {
    nameCompany,
    email,
    cccd,
  });
  return response.data;
};

/**
 * Get transaction status
 * @param {string} orderId - MoMo order ID
 * @returns {Promise<Object>} Transaction details
 */
export const getTransactionStatus = async (orderId) => {
  const response = await apiClient.get(`/api/transaction/${orderId}`);
  return response.data;
};

export default apiClient;
