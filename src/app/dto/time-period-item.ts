export class TimePeriodItem {
  text:string = ''
  unixtime: number = 0
  constructor(text: string, unixtime: number) {
    this.text = text;
    this.unixtime = unixtime;
  }
}
