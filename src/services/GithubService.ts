import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { language } from "ionicons/icons";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: GITHUB_API_TOKEN,
      },
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
      },
    });
    const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
      name: repo.name,
      owner: repo.owner ? repo.owner.login : null,
      description: repo.description ? repo.description : null,
      imageUrl: repo.owner ? repo.owner.avatar_url : null,
      language: repo.language ? repo.language : null,
    }));
    return repositories;
  } catch (error) {
    console.error("Error en la recoleccion de datos de axios");
    return [];
  }
};
