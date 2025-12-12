import React from 'react';
import { IonTextarea, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { IonInput, IonText } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {

  const history = useHistory();

  const repoFormData: RepositoryItem = {
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  };

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepo = () => {
    console.log("Guardando repositorio", repoFormData);
    if(repoFormData.name.trim() === ''){
      alert("El nombre del repositorio es obligatorio")
      return;
    }

    createRepository(repoFormData).then(() => {
      
      history.push('/tab1');
    }).catch((error) => {
      console.error("Error al crear el repositorio ", error)
    })

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario Repos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='input-repo'>
          <IonInput 
          fill='outline' 
          className="input-data" 
          labelPlacement="floating" 
          placeholder='New repo' 
          value={repoFormData.name}
          onIonChange={(e) => setRepoName(e.detail.value!)}
          >
            <div slot="label">
              Nombre Repositorio <IonText color="danger">(Required)</IonText>
            </div>
          </IonInput>
          <IonTextarea 
          fill='outline' 
          rows={5} 
          className="input-data" 
          labelPlacement="floating" 
          placeholder='New description' 
          value={repoFormData.description}
          onIonChange={(e) => setRepoDescription(e.detail.value!)}
          >
            <div slot="label">
              Descripcion <IonText color="danger">(Required)</IonText>
            </div>
          </IonTextarea>

          <IonButton 
          className="input-data" 
          expand='block' 
          onClick={saveRepo}
          >
            Guradar
          </IonButton>
        </div>

      </IonContent>
    </IonPage >
  );
};

export default Tab2;
