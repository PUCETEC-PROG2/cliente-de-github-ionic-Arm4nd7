import React, { useState } from 'react';
import { IonInput, IonText, IonTextarea, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, useIonViewDidEnter, IonLoading, IonToast } from '@ionic/react';
import './Tab4.css';
import { useHistory, useParams } from 'react-router-dom';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { editRepository, fetchRepository } from '../services/GithubService';

const Tab4: React.FC = () => {
    const history = useHistory();
    const { owner, repoName } = useParams<{ owner: string; repoName: string }>();

    const [repoFormData, setRepoFormData] = useState<RepositoryItem>({
        name: '',
        description: '',
        imageUrl: null,
        owner: null,
        language: null,
    });

    const loadInfoRepo = async () => {
        try {
            const repo = await fetchRepository(owner, repoName);
            if (repo) {
                setRepoFormData(repo);
            } else {
                alert("No se pudo cargar la información del repositorio");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useIonViewDidEnter(() => {
        loadInfoRepo();
    });

    const handleEdit = async () => {
        if (!repoFormData.name.trim()) {
            alert("El nombre del repositorio es obligatorio");
            return;
        }
        try {

            await editRepository(owner, repoName, {
                name: repoFormData.name,
                description: repoFormData.description
            });
            alert("Repositorio actualizado con éxito");
            setTimeout(() => {
                history.push('/tab1');
            }, 1500);
        } catch (error) {
            alert("Error al editar el repositorio " + error);
            
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Editar Repositorio</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">

                <div className='input-repo'>
                    <IonInput
                        fill='outline'
                        className="input-data"
                        labelPlacement="floating"
                        placeholder='Nombre del repo'
                        value={repoFormData.name}
                        onIonChange={(e) => setRepoFormData({ ...repoFormData, name: e.detail.value! })}
                    >
                        <div slot="label">
                            Nombre Repositorio <IonText color="danger">(Requerido)</IonText>
                        </div>
                    </IonInput>

                    <IonTextarea
                        fill='outline'
                        rows={5}
                        className="input-data"
                        labelPlacement="floating"
                        placeholder='Descripción'
                        value={repoFormData.description || ''}
                        onIonChange={(e) => setRepoFormData({ ...repoFormData, description: e.detail.value! })}
                    >
                        <div slot="label">
                            Descripción
                        </div>
                    </IonTextarea>

                    <IonButton
                        className="input-data"
                        expand='block'
                        onClick={handleEdit}
                    >
                        Guardar Cambios
                    </IonButton>

                    <IonButton
                        className="input-data"
                        expand='block'
                        fill="outline"
                        color="medium"
                        onClick={() => history.push('/tab1')}
                    >
                        Cancelar
                    </IonButton>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default Tab4;
