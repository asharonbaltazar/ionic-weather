import React, { useState } from 'react';
import { Weather } from '@components/WeatherCard';
import { WeatherTimeline } from '@components/WeatherTimeline';
import { DaysToggle } from 'src/components/DaysToggle';
import { RainChip } from '@components/RainChip';

export const Content = () => {
  const [day, setDay] = useState<'today' | 'tomorrow'>('today');

  return (
    <div className="mt-16 px-3">
      <Weather day={day} />
      <RainChip day={day} />
      <DaysToggle day={day} setDay={setDay} />
      <WeatherTimeline day={day} />
    </div>
  );
};
