import React from 'react';
import { IonApp} from '@ionic/react';
import { IonAlert, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonBackButton} from '@ionic/react';
import BmiControls from '../components/BmiControls';
import InputControl from '../components/InputControl';
import BmiResult from '../components/BmiResult';
import {useRef, useState} from "react";

const BmiCalc: React.FC = () => {
      const [ calculatedBMI, setCalculatedBMI  ] = useState<number>();
      const [ bmi_criteria, setCriteriaResult  ] = useState<string>("Kriteria");
      const heightInputRef = useRef<HTMLIonInputElement>(null);
      const weightInputRef = useRef<HTMLIonInputElement>(null);
      const [error, setError ] = useState<string>();
      const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

      const calculateBMI = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;

        if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
          setError('Please enter a valid (non-negative) input number');
          return;
        }
        if(calcUnits === 'cmkg') {
          const bmi: number = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));
          setCalculatedBMI(bmi);
          setCriteriaResult(bmi_result(bmi));
        } else if (calcUnits === 'ftlbs') {
          const bmi: number = (+enteredWeight/2.2) / ((+enteredHeight/3.28) * (+enteredHeight/3.28));
          setCalculatedBMI(bmi);
          setCriteriaResult(bmi_result(bmi));
        }
      };

      const bmi_result = (bmi: number): string => {
        if(bmi <= 18.5) {return "kurus";}
        else if(bmi >= 18.5 && bmi <= 24.9) {return "Normal";}
        else if(bmi >= 25 && bmi <= 29.9) {return "Gemuk";}
        else if(bmi >= 30){return "Obesitas";}
        else {return "error"}
      }

      const resetAll = () => {
        heightInputRef.current!.value = " ";
        weightInputRef.current!.value = " ";
        setCalculatedBMI(0);
        setCriteriaResult("Kriteria")
      }

      const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
        setCalcUnits(selectedValue);
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
          <IonTitle>BMI Calculator</IonTitle>
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
                      <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                      <IonInput ref={heightInputRef}></IonInput>
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                      <IonInput ref={weightInputRef}></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <BmiControls onCalculate={calculateBMI} onReset={resetAll}/>
                {(calculatedBMI !=null && calculatedBMI > 0) && (<IonRow>
                  <IonCol>
                    <BmiResult onCriteria={bmi_criteria} onCalculatedBMI={calculatedBMI}/>
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
export default BmiCalc;
