export const startOfDay = (instant: string | number | Date): Date => {
    const d = new Date(instant);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
};
