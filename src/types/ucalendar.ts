const getDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

export class UCDay {
  date: Date = new Date();
  isLast: boolean = false;
  isNext: boolean = false;
  isEqual(date: Date) {
    return getDay(date).getTime() == getDay(this.date).getTime();
  }
  constructor(date: Date, isLast: boolean = false, isNext: boolean = false) {
    this.date = date;
    this.isLast = isLast;
    this.isNext = isNext;
  }
}
export type UCWeek = UCDay[][];

export class UCalendar {
  today: Date = new Date();
  selected: Date = new Date();
  date: Date = new Date();
  month: string = "";
  names: string[] = [];
  days: UCDay[] = [];
  weeks: UCWeek = [];

  setDate(date: Date, selected?: Date) {
    this.date = date;
    this.days = this.getDays();
    this.weeks = this.getWeeks();
    this.month = this.getMonthText();
    if (selected) this.selected = selected;
    return this;
  }

  getLastMonthLastDay() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    return new Date(year, month, 0);
  }
  getFirstDay() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    return new Date(year, month, 1);
  }
  getLastDay() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    return new Date(year, month + 1, 0);
  }
  getNextMonthFirstDay() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    return new Date(year, month + 1, 1);
  }
  getMonthText() {
    const year = this.selected.toLocaleDateString(
      window.lang ?? window.navigator.language,
      {
        year: "numeric",
      }
    );
    const month = this.selected.toLocaleDateString(
      window.lang ?? window.navigator.language,
      {
        month: "long",
      }
    );
    return `${year} ${month}`;
  }
  calendarFirstDay() {
    return this.getFirstDay();
  }
  getNames() {
    const firstDay = this.getFirstDay();
    const day = 7 - firstDay.getDay();
    const getDayName = (i: number) =>
      new Date(firstDay.setDate(i + day + 1)).toLocaleDateString(
        window.lang ?? window.navigator.language,
        { weekday: "short" }
      );
    const names = Array.from({ length: 7 }, (_, i) => getDayName(i));
    return names;
  }
  getDays() {
    const days = Array.from({ length: this.getLastDay().getDate() }, (_, i) => {
      const day = new UCDay(new Date(this.getFirstDay().setDate(i + 1)));
      if (day.isEqual(new Date())) this.today = day.date;
      if (day.isEqual(new Date())) this.selected = day.date;
      return day;
    });

    // add days from earlier month
    const firstDay = this.getFirstDay();
    const lastMonthDay = this.getLastMonthLastDay().getDate();
    const firstWeekDay = firstDay.getDay();
    for (let i = 0; i > firstWeekDay * -1; i--) {
      days.unshift(
        new UCDay(
          new Date(firstDay.setDate(i == 0 ? i : lastMonthDay + i)),
          true
        )
      );
    }

    // add days from next month
    const nextMonth = this.getNextMonthFirstDay();
    const lastDay = days[days.length - 1].date.getDay();
    for (let i = lastDay, x = 1; i < 6; i++, x++) {
      days.push(new UCDay(new Date(nextMonth.setDate(x)), false, true));
    }
    return days;
  }
  getWeeks() {
    const weeks: UCWeek = [];
    let calendarDays = [...this.days];
    while (calendarDays.length != 0) {
      const week = calendarDays.splice(0, 7);
      weeks.push(week);
      if (weeks.length > 8) calendarDays = [];
    }
    return weeks;
  }

  constructor(date: Date) {
    this.date = date;
    this.names = this.getNames();
    this.days = this.getDays();
    this.weeks = this.getWeeks();
    this.month = this.getMonthText();
  }
}
