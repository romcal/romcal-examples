import { addMonths, subMonths } from 'date-fns';
import { makeAutoObservable, runInAction } from 'mobx';
import { Romcal, BaseLiturgicalDay } from 'romcal';

import { CALENDARS } from '../constants/calendars';

export class RomcalStore {
  fetchingData: boolean = false;
  yearlyData: BaseLiturgicalDay[][] = [];
  monthlyData: BaseLiturgicalDay[][] = [];
  localeId: string = 'En';
  calendarId: string = 'GeneralRoman';
  currentDate: Date = new Date();

  constructor() {
    makeAutoObservable(this);
    this.currentDate.setDate(1);
  }

  fetchRomcalData = async () => {
    if (this.yearlyData.length === 0) {
      const calendar = (await CALENDARS[this.calendarId])[`${this.calendarId}_${this.localeId}`];
      const romcal = new Romcal({ localizedCalendar: calendar });
      const data = await romcal.generateCalendar(this.currentDate.getFullYear()).then(Object.values);
      runInAction(() => {
        this.yearlyData = data;
      });
    }
    return Promise.resolve();
  };

  getMonthData = () => {
    runInAction(() => (this.fetchingData = true));
    this.fetchRomcalData().then(() => {
      const monthlyData = this.yearlyData.filter(
        (days) => new Date(days[0].date).getUTCMonth() === this.currentDate.getUTCMonth()
      );
      runInAction(() => {
        this.monthlyData = monthlyData;
        this.fetchingData = false;
      });
    });
  };

  setCalendarId = (id: string): void => {
    this.calendarId = id;
    this.yearlyData = [];
    this.getMonthData();
  };

  setLocaleId = (id: string): void => {
    this.localeId = id;
    this.yearlyData = [];
    this.getMonthData();
  };

  setDate = (date: Date): void => {
    const newYear = date.getFullYear();
    if (newYear !== this.currentDate.getFullYear()) this.yearlyData = [];
    this.currentDate = date;
    this.getMonthData();
  };

  setPreviousMonth = (): void => {
    const newDate = subMonths(this.currentDate, 1);
    if (newDate.getFullYear() !== this.currentDate.getFullYear()) this.yearlyData = [];
    this.currentDate = newDate;
    this.getMonthData();
  };

  setNextMonth = (): void => {
    const newDate = addMonths(this.currentDate, 1);
    if (newDate.getFullYear() !== this.currentDate.getFullYear()) this.yearlyData = [];
    this.currentDate = newDate;
    this.getMonthData();
  };
}
