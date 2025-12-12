import React from 'react';
import { IonTextarea, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { IonInput, IonText } from '@ionic/react';
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
        <div className='input-repo'>
          <IonInput fill='outline' className="input-data" labelPlacement="floating" placeholder='New repo' value="">
            <div slot="label">
              Nombre Repositorio <IonText color="danger">(Required)</IonText>
            </div>
          </IonInput>
          <IonTextarea fill='outline' rows={5} className="input-data" labelPlacement="floating" placeholder='New description' value="">
            <div slot="label">
              Descripcion <IonText color="danger">(Required)</IonText>
            </div>
          </IonTextarea>

          <IonButton className="input-data" expand='block'>
            Guradar
          </IonButton>
        </div>

      </IonContent>
    </IonPage >
  );
};

export default Tab2;
