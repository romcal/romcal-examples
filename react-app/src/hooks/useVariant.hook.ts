import { DayVariant } from '../components/Day';

export const useVariant = () => {
  return (import.meta.env.VITE_DAY_VARIANT as DayVariant) ?? DayVariant.Simple;
};
