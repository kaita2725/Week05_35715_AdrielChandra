import React from 'react';
import {IonRow, IonCol, IonCard, IonCardContent} from "@ionic/react"
import './BmiResult.css'

const BmiResult: React.FC <{onCriteria: string ; onCalculatedBMI: number}> = props => {

  return (
    <IonRow>
      <IonCol>
      {props.onCriteria === 'Normal' ?
        <IonCard id="result" className="ion-card-success">
          <IonCardContent className="ion-text-center">
            <h2>{props.onCalculatedBMI}</h2>
            <h1>{props.onCriteria}  </h1>
          </IonCardContent>
        </IonCard>: null}
      {props.onCriteria === 'Gemuk' || props.onCriteria === 'kurus' ?
        <IonCard id="result" className="ion-card-warning">
          <IonCardContent className="ion-text-center">
            <h2>{props.onCalculatedBMI}</h2>
            <h1>{props.onCriteria}  </h1>
          </IonCardContent>
        </IonCard>: null}
      {props.onCriteria === 'Obesitas' ?
        <IonCard id="result" className="ion-card-danger">
          <IonCardContent className="ion-text-center">
            <h2>{props.onCalculatedBMI}</h2>
            <h1>{props.onCriteria}  </h1>
          </IonCardContent>
        </IonCard>: null}
    </IonCol>
    </IonRow>
  );
};
export default BmiResult;
