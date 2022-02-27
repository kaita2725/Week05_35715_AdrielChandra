import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="Ion-padding">
      <h2>00000035715 - Adriel Chandra</h2>
      <IonButton routerDirection="forward" href="/bmi">BMI Calculator</IonButton>
      <IonButton routerDirection="forward" href="/bmr">BMR Calculator</IonButton>
    </IonContent>
    </IonPage>
  );
};

export default Home;
