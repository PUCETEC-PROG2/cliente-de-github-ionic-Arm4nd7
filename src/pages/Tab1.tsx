import React from 'react';
import { IonIcon, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonList, useIonAlert } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import { archive, pencil, trash } from 'ionicons/icons';
import './Tab1.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository } from '../services/GithubService';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);
  const [presentAlert] = useIonAlert();

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  }

  useIonViewDidEnter(() => {
    console.log("**********Estoy leyendo los repositorios************")
    loadRepos();
  });

  const handleDelete = (owner: string | null, repoName: string) => {
    if (!owner) return;

    presentAlert({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar el repositorio "${repoName}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            try {
              await deleteRepository(repoName, owner);
              await loadRepos();
            } catch (error) {
              alert("Error al eliminar el repositorio " + error);
            }
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map((repo, index) => (
            <IonItemSliding key={index}>
              <IonItemOptions side="start">
                <IonItemOption color="success">
                  <IonIcon slot="icon-only" icon={archive} ></IonIcon>
                </IonItemOption>
              </IonItemOptions>
              <IonItem>
                <IonLabel>
                  <RepoItem
                    name={repo.name}
                    imageUrl={repo.imageUrl}
                    description={repo.description}
                    language={repo.language}
                    owner={repo.owner}
                  />
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">

                <IonItemOption routerLink={`/tab4/${repo.owner}/${repo.name}`} routerDirection="forward">
                  <IonIcon slot="icon-only" icon={pencil}></IonIcon>
                </IonItemOption>

                <IonItemOption color="danger" onClick={() => handleDelete(repo.owner, repo.name)}>
                  <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
