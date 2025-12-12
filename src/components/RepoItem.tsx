import './RepoItem.css'
import React from 'react';
import {
    IonItem,
    IonLabel,
    IonThumbnail,
} from '@ionic/react';

import { RepositoryItem } from '../interfaces/RepositoryItem';

const RepoItem: React.FC<RepositoryItem> = ({ name, description, imageUrl, owner, language }) => {
    return (
        <IonItem>
            <IonThumbnail slot="start">
                <img alt="Lista de repos" src={imageUrl || "https://ionicframework.com/docs/img/demos/thumbnail.svg"} />
            </IonThumbnail>
            <IonLabel>
                <h3>{name}</h3>
                <p>Propietario: {owner}</p>
                <div>
                    <br />
                    <p>{description}</p>
                    <br />
                </div>
                <p>Lenguaje: {language}</p>
            </IonLabel>
        </IonItem>
    );
};

export default RepoItem;