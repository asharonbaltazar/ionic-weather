import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowForwardSharp, chevronForward } from 'ionicons/icons';
import { Button } from '@mantine/core';

interface DaysToggleProps {
  day: 'today' | 'tomorrow';
  setDay: (newDay: 'today' | 'tomorrow') => void;
}

export const DaysToggle = ({ day, setDay }: DaysToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Button
          variant={day === 'today' ? 'outline' : 'subtle'}
          onClick={() => setDay('today')}
        >
          Today
        </Button>
        <Button
          variant={day === 'tomorrow' ? 'outline' : 'subtle'}
          onClick={() => setDay('tomorrow')}
        >
          Tomorrow
        </Button>
      </div>
      <IonButton className="next-7-days" fill="clear" routerLink="/week">
        Next 7 days
        <IonIcon slot="end" ios={chevronForward} md={arrowForwardSharp} />
      </IonButton>
    </div>
  );
};
