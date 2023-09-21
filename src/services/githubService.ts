import axios from "axios";

import { TRepository } from "../types";

const GITHUB_API_BASE_URL = "https://api.github.com";

const axiosInstance = axios.create({
  baseURL: GITHUB_API_BASE_URL,
});

type TGetDateGitHub = {
  query: string;
};

export async function fetchGitHubData({
  query,
}: TGetDateGitHub): Promise<TRepository[]> {
  try {
    const response = await axiosInstance.get(`/search/repositories?q=${query}`);

    return response.data.items;
  } catch (error) {
    throw error;
  }
}
