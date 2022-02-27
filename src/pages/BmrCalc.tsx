import React from 'react';
import { IonApp} from '@ionic/react';
import { IonAlert, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonBackButton, IonRadioGroup, IonListHeader, IonRadio} from '@ionic/react';
import BmiControls from '../components/BmiControls';
import InputControl from '../components/InputControl';
import BmrResult from '../components/BmrResult';
import {useRef, useState} from "react";

const BmrCalc: React.FC = () => {
      const [calculatedBMR, setCalculatedBMR ] = useState<number>();
      const ageInputRef = useRef<HTMLIonInputElement>(null);
      const genderInputRef = useRef<HTMLIonRadioGroupElement>(null);
      const heightInputRef = useRef<HTMLIonInputElement>(null);
      const weightInputRef = useRef<HTMLIonInputElement>(null);
      const [error, setError ] = useState<string>();
      const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

      const calculateBMR = () => {
        const enteredAge = ageInputRef.current!.value;
        const enteredGender = genderInputRef.current!.value;
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;

        if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
          setError('Please enter a valid (non-negative) input number');
          return;
        }

        let bmr: number = 0;

        if(enteredGender === 'male'){
          bmr = 66 + (13.7 * +enteredWeight) + (5 * +enteredHeight) - (6.8 * +enteredAge!);
        } else if(enteredGender === 'female'){
          bmr = 65 + (9.6 * +enteredWeight) + (1.8 * +enteredHeight) - (4.7 * +enteredAge!);
        }
        console.log(bmr);
        setCalculatedBMR(bmr);
      };

      const resetAll = () => {
        ageInputRef.current!.value = " ";
        genderInputRef.current!.value = " ";
        heightInputRef.current!.value = " ";
        weightInputRef.current!.value = " ";
        setCalculatedBMR(0);
      }

      const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
        setCalcUnits(selectedValue);

        if(calcUnits === 'cmkg') {
          heightInputRef.current!.value = (heightInputRef.current!.value ? +heightInputRef.current!.value : 0) / 0.0328;
          weightInputRef.current!.value = (weightInputRef.current!.value ? +weightInputRef.current!.value : 0) / 2.2;
        } else if (calcUnits === 'ftlbs') {
          heightInputRef.current!.value = (heightInputRef.current!.value ? +heightInputRef.current!.value : 0) * 30.48;
          weightInputRef.current!.value = (weightInputRef.current!.value ? +weightInputRef.current!.value : 0) * 2.2;
        }
      };

  return (
    <IonApp>
      <IonAlert
        isOpen={!!error}
        message= {error}
        buttons={[
          {text: 'okay', handler: clearError => {
                  console.log('Confirm k button');
                }}
      ]}
      />
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" color="dark" fill="clear" >
            <IonBackButton defaultHref={'/home'}/>
          </IonButton>
          <IonTitle>BMR Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol>
                  <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Age</IonLabel>
                    <IonInput ref={ageInputRef}></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRadioGroup allowEmptySelection ref={genderInputRef}>
                <IonListHeader>
                  <IonLabel>Gender</IonLabel>
                </IonListHeader>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Male</IonLabel>
                      <IonRadio slot="start" value="male" />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Female</IonLabel>
                      <IonRadio slot="start" value="female" />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonRadioGroup>

              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                    <IonInput ref={heightInputRef}></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                    <IonInput ref={weightInputRef}></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>

              <BmiControls onCalculate={calculateBMR} onReset={resetAll}/>
              {(calculatedBMR !=null && calculatedBMR > 0) && (<IonRow>
                <IonCol>
                  <BmrResult onCalculatedBMR={calculatedBMR}/>
                </IonCol>
              </IonRow>)}
            </IonGrid>
          </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonApp>
)
};
export default BmrCalc
