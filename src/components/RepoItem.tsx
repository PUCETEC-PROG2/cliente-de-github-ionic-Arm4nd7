import './RepoItem.css'
import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
} from '@ionic/react';
import { airplane, bluetooth, call, wifi } from 'ionicons/icons';

interface RepoProps {
    name: string;
    imageUrl: string;
}

const RepoItem: React.FC<RepoProps> = ({ name, imageUrl }) => {
    return (
        <IonItem>
            <IonThumbnail slot="start">
                <img alt="Lista de repos" src={ imageUrl || "https://ionicframework.com/docs/img/demos/thumbnail.svg" }/>
            </IonThumbnail>
            <IonLabel>{name}</IonLabel>
        </IonItem>
    );
};

export default RepoItem;