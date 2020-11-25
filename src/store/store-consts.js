
export const metrics = [
  {
    measurement: 'Standard',
    unit: 'K',
    speed: 'km/h',
  },
  {
    measurement: 'Metric',
    unit: 'C',
    speed: 'km/h',
  },
  {
    measurement: 'Imperial',
    unit: 'F',
    speed: 'mph',
  },
];

export const view = [
  'Current',
  'Hourly',
  'Daily',
];

export const defaultSelections = {
  selections: {
    view: 'Current',
    metric: {
      measurement: 'Standard',
      unit: 'K',
      speed: 'km/h',
    },
    inputValue: '',
  },
};

