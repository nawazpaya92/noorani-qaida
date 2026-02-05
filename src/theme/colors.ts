export type Theme = {
  mode: 'light' | 'dark';
  bg: string;
  header: string;
  headerText: string;
  card: string;
  text: string;
  subtitle: string;
  accent: string;
  red: string;
  green: string;
  blue: string;
  grey: string;
  lightBlue: string;
};

export const lightTheme: Theme = {
  mode: 'light',
  bg: '#f6f8fa',
  header: '#0b3d91',
  headerText: '#ffffff',
  card: '#ffffff',
  text: '#0b3d91',
  subtitle: '#55607a',
  accent: '#ffd54f',
  red: '#e53935',
  green: '#43a047',
  blue: '#0b3d91',
  grey: '#e3e3e340',
  lightBlue: '#DBEAFE',

};

export const darkTheme: Theme = {
  mode: 'dark',
  bg: '#0b1220',
  header: '#081033',
  headerText: '#ffffff',
  card: '#0e1724',
  text: '#dbe9ff',
  subtitle: '#aeb9c9',
  accent: '#ffd54f',
  red: '#ff6b6b',
  green: '#43a047',
  blue: '#6ea8fe',
  grey: '#2b2b2b55',
  lightBlue: '#1e2a47',
};
