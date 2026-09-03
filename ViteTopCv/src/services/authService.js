import axiosClient from "./axiosClient";

export const loginEmployer = async (payload) => {
  const response = await axiosClient.post(
    "/auth/login",
    payload
  );

  return response.data;
};