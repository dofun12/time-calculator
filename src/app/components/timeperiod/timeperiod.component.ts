import {Component} from '@angular/core';
import * as moment from "moment";
import {TimeItem} from "../../dto/time-item";
import {interval, timeout} from "rxjs";

const defaultFormat = 'YYYY-MM-DDTHH:mm';


@Component({
  selector: 'app-timeperiod',
  templateUrl: './timeperiod.component.html',
  styleUrls: ['./timeperiod.component.scss']
})
export class TimeperiodComponent {
  time = ''
  timelist: TimeItem[] = [];
  errorMessage = '';
  selectedTime = moment().format(defaultFormat);
  totalDiffTime = '0h';

  canAdd(selectedMoment: moment.Moment) {
    const lastItem = this.timelist[this.timelist.length - 1];
    if (!lastItem) {
      return true;
    }
    return selectedMoment.unix() - lastItem.unixtime > 0;

  }

  generateDiff() {
    let first = undefined;
    let second = undefined;
    let total = 0;
    for (let time of this.timelist) {
      if (!first) {
        first = time;
        continue;
      }
      const momentFirst = moment.unix(first.unixtime);
      const momentSecond = moment.unix(time.unixtime);
      total = total+ (momentSecond.diff(momentFirst, 'seconds'));

      first = undefined;
      second = undefined;


    }
    let duration = moment.duration(total, 'seconds');
    if(duration.get('days') > 0) {
      this.totalDiffTime = `${duration.get('days')}d ${duration.get('hours')}h ${duration.get('minutes')}m ${duration.get('seconds')}s`;
      return;
    }
    this.totalDiffTime = `${duration.get('hours')}h ${duration.get('minutes')}m ${duration.get('seconds')}s`;
  }

  addTime(unixtime?: number) {
    this.errorMessage = '';
    let selectedMoment = moment();
    if (unixtime) {
      selectedMoment = moment.unix(unixtime);
      this.timelist.push(new TimeItem(selectedMoment.format('LL LT'), selectedMoment.unix()));
      this.generateDiff();
      return;
    }


    selectedMoment = moment(this.selectedTime, defaultFormat);
    if (!this.canAdd(selectedMoment)) {
      this.errorMessage = 'A data deve ser maior que ultima data adicionada';
      setTimeout(() => {                           // <<<---using ()=> syntax
        this.errorMessage = '';
      }, 3000);
      return;
    }
    this.timelist.push(new TimeItem(selectedMoment.format('LL LT'), selectedMoment.unix()));
    this.generateDiff();
  }

  constructor() {
    //const now = moment();
    //this.addTime()
    //this.addTime(now.add(1, 'h').unix())
  }
}
