import axiosClient from "./axiosClient";

export const getJobs = async (page = 1) => {
  const response = await axiosClient.get("/jobs", {
    params: {
      page,
    },
  });

  return response.data;
};

export const getJobBySlug = async (slug) => {
  const response = await axiosClient.get(
    `/jobs/${slug}`
  );

  return response.data;
};

export const createJob = async (payload) => {
  const response = await axiosClient.post(
    "/employer/jobs",
    payload
  );

  return response.data;
};