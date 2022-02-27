import React from 'react';
import {IonCard,  IonCardContent, IonItem, IonLabel} from "@ionic/react";

const BmiResult: React.FC <{onCalculatedBMR: number}> = props => {

  return (
    <IonCard id="result">
      <IonCardContent className="ion-text-center">
        <h2>BMR = {props.onCalculatedBMR} Calories/day</h2>
        daily calorie needs based on activity level
          <IonItem lines="none" className="BmiResult">
            <IonLabel>Activity Level</IonLabel>
            <IonLabel slot={'end'}>Calorie</IonLabel>
          </IonItem>
          <IonItem lines="none" className="BmiResult">
            <IonLabel color="medium" className="ion-text-wrap">Sedentary: little or no exercise</IonLabel>
            <IonLabel color="medium" slot={'end'}>{(1.2 * props.onCalculatedBMR).toFixed(2)}</IonLabel>
          </IonItem>
          <IonItem lines="none" className="BmiResult">
            <IonLabel color="medium" className="ion-text-wrap">Exercise 1-3 times/week</IonLabel>
            <IonLabel color="medium" slot={'end'}>{(1.375 * props.onCalculatedBMR).toFixed(2)}</IonLabel>
          </IonItem>
          <IonItem lines="none" className="BmiResult">
            <IonLabel color="medium" className="ion-text-wrap">Exercise 4-5 times/week</IonLabel>
            <IonLabel color="medium" slot={'end'}>{(1.55 * props.onCalculatedBMR).toFixed(2)}</IonLabel>
          </IonItem>
          <IonItem lines="none" className="BmiResult">
            <IonLabel color="medium" className="ion-text-wrap">Daily exercise or intense exercise 3-4</IonLabel>
            <IonLabel color="medium" slot={'end'}>{(1.725 * props.onCalculatedBMR).toFixed(2)}</IonLabel>
          </IonItem>
          <IonItem lines="none" className="BmiResult">
            <IonLabel color="medium" className="ion-text-wrap">Intense exercise 6-7 times/week</IonLabel>
            <IonLabel color="medium" slot={'end'}>{(1.9 * props.onCalculatedBMR).toFixed(2)}</IonLabel>
          </IonItem>
      </IonCardContent>
    </IonCard>
  );
};
export default BmiResult;
