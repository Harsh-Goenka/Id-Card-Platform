import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // Never try to refresh when the refresh request itself fails
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {

      originalRequest._retry = true;

      try {

        const response = await api.post("/auth/refresh");

        const accessToken =
          response.data.data.accessToken;

        localStorage.setItem(
          "accessToken",
          accessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return api(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem("accessToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);

  }

);

export default api;