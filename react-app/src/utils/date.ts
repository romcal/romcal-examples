export const startOfDay = (instant: string | number | Date): Date => {
  const d = new Date(instant);
  if (d.getTimezoneOffset() < 0) {
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  }
  if (d.getTimezoneOffset() > 0) {
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  return d;
};
