import {TimePeriodItem} from "./time-period-item";
import * as moment from 'moment';
export class TimePeriod{
  id = 0;
  timeStart: TimePeriodItem;
  timeEnd: TimePeriodItem;
  duration: moment.Duration;
  diffSeconds: number = 0;

  constructor(id:number, timeStart: TimePeriodItem, timeEnd: TimePeriodItem, duration: moment.Duration) {
    this.id = id;
    this.duration = duration;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
  }

  get getDurationText(){
    const duration = this.duration;
    if(this.duration.get('days') > 0) {
      return `${duration.get('days')}d ${duration.get('hours')}h ${duration.get('minutes')}m ${duration.get('seconds')}s`;
    }
    return `${duration.get('hours')}h ${duration.get('minutes')}m ${duration.get('seconds')}s`;
  }
}

