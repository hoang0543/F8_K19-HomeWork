import axiosClient from "./axiosClient";

// Đăng ký công ty
export const registerEmployer = async (payload) => {
    const response = await axiosClient.post(
        "/companies/register",
        payload
    );

    return response.data;
};

// Lấy danh sách công ty
export const getCompanies = async (page = 1) => {
    const response = await axiosClient.get(
        "/companies",
        {
            params: {
                page,
            },
        }
    );

    return response.data;
};

// Lấy công ty tương ứng với employer đang đăng nhập
export const getCurrentEmployerCompany = async () => {
    const savedUser =
        localStorage.getItem("user");

    if (!savedUser) {
        return null;
    }

    let user = null;

    try {
        user = JSON.parse(savedUser);
    } catch {
        return null;
    }

    if (!user?.email) {
        return null;
    }

    const response = await getCompanies(1);

    const companies =
        response?.data || [];

    const company = companies.find(
        (item) =>
            item.email === user.email
    );

    return company || null;
};

export const createJob = async (payload) => {
  const response = await axiosClient.post(
    "/employer/jobs",
    payload
  );

  return response.data;
};