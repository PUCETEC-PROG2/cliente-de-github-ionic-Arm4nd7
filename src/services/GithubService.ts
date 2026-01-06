import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

/**
 *
 * @returns Obtener repositorios
 */

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
        affiliation: "owner",
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
    console.error("Error en la recoleccion de datos de axios", error);
    return [];
  }
};

/**
 * Obtener un repositorio específico
 */
export const fetchRepository = async (owner: string, repoName: string): Promise<RepositoryItem | null> => {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repoName}`, {
        headers: {
          Authorization: GITHUB_API_TOKEN,
        },
      });
      const repo = response.data;
      return {
        name: repo.name,
        owner: repo.owner ? repo.owner.login : null,
        description: repo.description ? repo.description : null,
        imageUrl: repo.owner ? repo.owner.avatar_url : null,
        language: repo.language ? repo.language : null,
      };
    } catch (error) {
      console.error("Error al obtener el repositorio", error);
      return null;
    }
  };

/**
 * Crear repositorios
 * @param repo
 */
export const createRepository = async (repo: RepositoryItem): Promise<void> => {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, repo, {
      headers: {
        Authorization: GITHUB_API_TOKEN,
      },
    });
    console.log("Se creo el repositorio...", response.data);
  } catch (error) {
    console.error("Error al crear: ", error);
  }
};

/**
 * Editar repositorios
 * @param repoName 
 * @param updatedData 
 */
export const editRepository = async (
  owner: string,
  repoName: string,
  updatedData: Partial<RepositoryItem>
): Promise<void> => {
  try {
    const response = await axios.patch(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}`,
      {
        name: updatedData.name,
        description: updatedData.description
      },
      {
        headers: {
          Authorization: GITHUB_API_TOKEN,
        },
      }
    );
    console.log("Se edito el repositorio...", response.data);
  } catch (error) {
    console.error("Error al editar: ", error);
    throw error;
  }
}

/**
 * Eliminar repositorios
 * @param repoName 
 * @param owner 
 */

export const deleteRepository = async (
  repoName: string,
  owner: string
): Promise<void> => {
  try {
    const response = await axios.delete(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}`,
      {
        headers: {
          Authorization: GITHUB_API_TOKEN,
        },
      }
    );
    console.log("Se elimino el repositorio...", response.data);
  } catch (error) {
    console.error("Error al eliminar: ", error);
    throw error;
  }
};

/**
 *
 * @returns retornamos algo para el usuairo
 */
export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        Authorization: GITHUB_API_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar el usuario; ", error);
    alert("Error al recuperar los datos del usuario");
    return null;
  }
};
