import axiosClient from "./axiosClient";

/* =========================
   LOGIN
========================= */

export const login = async (payload) => {
  const response = await axiosClient.post(
    "/auth/login",
    payload
  );

  return response.data;
};

/* =========================
   LOGOUT
========================= */

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");

  // Xóa các dữ liệu đăng nhập cũ nếu trước đây bạn từng lưu
  localStorage.removeItem("company_name");
  localStorage.removeItem("company");
};