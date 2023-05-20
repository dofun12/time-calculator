import {Component} from '@angular/core';
import * as moment from "moment";
import {TimePeriodItem} from "../../dto/time-period-item";
import {interval, timeout} from "rxjs";
import {TimePeriod} from "../../dto/time-period";

const defaultFormat = 'YYYY-MM-DDTHH:mm';
const listFormat = 'DD/MM/YYYY HH:mm:ss';

@Component({
  selector: 'app-timeperiod',
  templateUrl: './timeperiod.component.html',
  styleUrls: ['./timeperiod.component.scss']
})
export class TimeperiodComponent {
  time = ''
  timelist: TimePeriod[] = [];
  errorMessage = '';
  selectedTime = moment().format(defaultFormat);
  totalDiffTime = '0h';
  index = 0;

  canAdd(startMoment: moment.Moment, endMomentUnix: number) {
    const resp = endMomentUnix - startMoment.unix();
    return resp > 0;
  }

  generateDiff() {


  }

  deleteTimePeriod(id:number){
    let tmpArray: TimePeriod[] = [];
    for(let list of this.timelist){
      if(id == list.id){
        continue;
      }
      tmpArray.push(list);
    }
    this.timelist = tmpArray;
  }
  private addTimePeriodItem(timePeriodItem: TimePeriodItem){
    if(this.timelist.length == 0){
        const timePeriod = new TimePeriod(this.index++,timePeriodItem, new TimePeriodItem('',0), moment.duration(0,'seconds'))
        this.timelist.push(timePeriod);
        console.log(this.timelist);
        return;
    }
    const last = this.timelist.length-1;
    let lastItem = this.timelist[last];

    if(lastItem.timeEnd.unixtime > 0){
      const timePeriod = new TimePeriod(this.index++,timePeriodItem, new TimePeriodItem('',0), moment.duration(0,'seconds'))
      this.timelist.push(timePeriod);
      console.log(this.timelist);
      return;
    }

    const momentFirst = moment.unix(lastItem.timeStart.unixtime);

    if (!this.canAdd(momentFirst, timePeriodItem.unixtime)) {
      this.errorMessage = 'A data deve ser maior que ultima data adicionada';
      setTimeout(() => {                           // <<<---using ()=> syntax
        this.errorMessage = '';
      }, 3000);
      return;
    }
    lastItem.timeEnd = timePeriodItem;

    const momentSecond = moment.unix(lastItem.timeEnd.unixtime);
    lastItem.diffSeconds = momentSecond.diff(momentFirst, 'seconds');
    lastItem.duration = moment.duration(lastItem.diffSeconds, 'seconds');
  }

  addTime(unixtime?: number) {
    this.errorMessage = '';
    let selectedMoment = moment();
    if (unixtime) {
      selectedMoment = moment.unix(unixtime);
      this.addTimePeriodItem(new TimePeriodItem(selectedMoment.format(listFormat), selectedMoment.unix()));
      console.log(this.timelist);
      this.generateDiff();
      return;
    }


    selectedMoment = moment(this.selectedTime, defaultFormat);

    this.addTimePeriodItem(new TimePeriodItem(selectedMoment.format(listFormat), selectedMoment.unix()));
    this.generateDiff();
  }

  constructor() {
    //const now = moment();
    //this.addTime()
    //this.addTime(now.add(1, 'h').unix())
  }
}
