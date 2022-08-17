import React from 'react';
import { Button } from '@mantine/core';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface DaysToggleProps {
  day: 'today' | 'tomorrow';
  setDay: (newDay: 'today' | 'tomorrow') => void;
}

export const DaysToggle = ({ day, setDay }: DaysToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-x-2">
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
      <Button
        variant="subtle"
        rightIcon={
          <Icon className="text-2xl" icon="tabler:arrow-narrow-right" />
        }
        component={Link}
        to="/week"
      >
        Next 7 Days
      </Button>
    </div>
  );
};
