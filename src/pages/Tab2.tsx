import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { IonInput } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario Repos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='inputRepo'>
          <IonInput label="Nombre repositorio" labelPlacement="floating" fill="outline" placeholder="Ingresa nombre repositorio"></IonInput>
          <IonInput label="Descripcion repositorio" labelPlacement="floating" fill="outline" placeholder="Ingresa nombre repositorio"></IonInput>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
