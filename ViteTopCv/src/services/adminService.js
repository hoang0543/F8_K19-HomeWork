import axiosClient from "./axiosClient";

/* =========================
   COMPANY
========================= */

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