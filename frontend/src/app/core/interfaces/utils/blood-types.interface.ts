export type BloodTypes = keyof typeof BloodTypes;

export interface BloodType {
  id: number;
  type: BloodTypes;
}

export const BloodTypes = {
  'A+': 'A+',
  'A-': 'A-',
  'B+': 'B+',
  'B-': 'B-',
  'AB+': 'AB+',
  'AB-': 'AB-',
  'O+': 'O+',
  'O-': 'O-'
} as const;
