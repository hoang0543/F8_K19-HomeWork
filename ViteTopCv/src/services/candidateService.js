import axiosClient from "./axiosClient";

/* =========================
   AUTH - REGISTER
========================= */

export const registerCandidate = async (payload) => {
  const response = await axiosClient.post(
    "/auth/register",
    payload
  );

  return response.data;
};

/* =========================
   JOBS
========================= */

export const getJobs = async (page = 1) => {
  const response = await axiosClient.get(
    "/jobs",
    {
      params: {
        page,
      },
    }
  );

  return response.data;
};

export const getJobBySlug = async (slug) => {
  const response = await axiosClient.get(
    `/jobs/${slug}`
  );

  return response.data;
};

/* =========================
   CV
========================= */

export const createCV = async (payload) => {
  const response = await axiosClient.post(
    "/candidate/cvs",
    payload
  );

  return response.data;
};