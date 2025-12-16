import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';
import { useState } from 'react';
import { UserInfo } from '../interfaces/UserInfo';
import { getUserInfo } from '../services/GithubService';

const Tab3: React.FC = () => {

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Usuario no encontrado",
    login: "no-username",
    bio: "No se encuentra usuario",
    avatar_url: "https://wallpapers.com/images/hd/one-piece-monkey-d-luffy-pfp-creative-avatar-5ogooitwzh1namob.jpg"
  })


  const loadUserInfo = async () => {
    const response = await getUserInfo();
    if (response) {
      setUserInfo(response);
    }
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='card-container'>
          <IonCard>
            <img alt="Silhouette of mountains" src={userInfo.avatar_url} />
            <IonCardHeader className='card-field'>
              <IonCardTitle>{userInfo.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{userInfo.bio}</IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
