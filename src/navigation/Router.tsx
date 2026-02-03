import React, { createContext, useContext, useMemo, useState } from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import BacchoKaThofa from '../screens/BacchoKaThofa';
import LessonScreen from '../screens/LessonScreen';
import { Lesson } from '../data/lessons';
import AlphabetScreen from '../screens/alphabets';
import Tarteebh from '../screens/tarteebh';
import JointLetters from '../screens/JointLetters';

export type Route =
  | { name: 'Dashboard' }
  | { name: 'Baccho' }
  | { name: 'Lesson'; params: { lesson: Lesson } }
  | { name: 'Alphabets' }
  | { name: 'Tarteebh' }
  | { name: 'JointLetters' }
type Navigation = {
  push: (route: Route) => void;
  pop: () => void;
  replace: (route: Route) => void;
  stack: Route[];
};

const NavigationContext = createContext<Navigation | null>(null);

export const useNavigation = (): Navigation => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used inside NavigationProvider');
  return ctx;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stack, setStack] = useState<Route[]>([{ name: 'Dashboard' }]);

  const push = (route: Route) => setStack((s) => [...s, route]);
  const pop = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const replace = (route: Route) => setStack((s) => (s.length > 0 ? [...s.slice(0, -1), route] : [route]));

  const value = useMemo(() => ({ push, pop, replace, stack }), [stack]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const Router: React.FC = () => {
  // The provider above will ensure stack exists. We'll read the top and render accordingly.
  const ctx = useContext(NavigationContext);
  if (!ctx) return null;
  const top = ctx.stack[ctx.stack.length - 1];

  switch (top.name) {
    case 'Dashboard':
      return <DashboardScreen />;
    case 'Baccho':
      return <BacchoKaThofa />;
    case 'Lesson':
      return <LessonScreen lesson={top.params.lesson} onBack={ctx.pop} />;
    case 'Alphabets':
      return <AlphabetScreen />;
    case 'Tarteebh':
      return <Tarteebh />;
    case 'JointLetters':
      return <JointLetters />;
    default:
      return <DashboardScreen />;
  }
};

export default Router;
