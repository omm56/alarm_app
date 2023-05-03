import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {
  private days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  date = new Date();

  // to display current date and time
  hour: number | any;;
  minute: number | any;
  second: number | any;
  ampm: number | any;
  weekdays: number | any;

  // input fields
  hh: number | any;
  mm: number | any;
  ss: number | any;
  session: number | any;

  audio = new Audio("../assets/Morning Alarm.mp3");

  showsettime: "" | any;
  setalarm: any
  snooze: any

  isRunning = false

  constructor() { }

  ngOnInit() {
    this.displayCurrentTime();
    this.weekdays = this.days[this.date.getDay()];
  }
  CurrentTime(date: Date) {
    const hours = date.getHours();
    this.ampm = hours >= 12 ? 'pm' : 'am';
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12; // if the hour is 0 then 12 is assigned to it.

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes;

    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds;
  }
  displayCurrentTime() {
    setInterval(() => {
      let date = new Date();
      this.CurrentTime(date);
    }, 1000);
  }
  setAlarm() {
    this.showsettime = "Alarm set: " + this.hh + ":" + this.mm + ":" + this.session
    this.playAlarm();
  }
  playAlarm() {
    this.setalarm = setInterval(() => {
      if (this.hh == this.hour && this.mm == this.minute && this.session == this.ampm) {
        this.audio.play();
      }
    }, 1000);
  }
  snoozeAlarm() {
    let h = parseInt(this.hh);
    let m = parseInt(this.mm);

    if (m != 0 || h != 0) {
      let snoozmin = 5;
      let totalSnooze = snoozmin + m
      if (totalSnooze < 60) {
        clearInterval(this.setalarm)
        this.audio.pause();
        this.showsettime = "Alarm snoozed for " +snoozmin+ " minutes from now";
        m = totalSnooze; // 
        // this.hour = this.hour; // 06
        // console.log("almin:", m);
      }
      else if (totalSnooze >= 60) {
        clearInterval(this.setalarm)
        this.audio.pause();
        this.showsettime = "Alarm snoozed for " +snoozmin+ " minutes from now";
        totalSnooze -= 60;
        if (totalSnooze == 0) {
          m = 0;
        }else {
          m = totalSnooze;
        }
        h = h + 1;
        // console.log("altime", h + ":" + m);
      }

      this.snooze = setInterval(() => {
        if (h == this.hour && m == this.minute) {
          this.audio.play();
          clearInterval(this.snooze);

        }
        console.log(this.snooze);
      }, 1000);

    }
    this.hh=this.hour;
    this.mm=this.minute;
  }
  DismissAlarm() {
    clearInterval(this.setalarm);
    clearInterval(this.snooze);
    this.audio.pause();
    this.cleartextbox();
  }
  cleartextbox() {
    this.hh = "";
    this.mm = "";
    this.session = "";
    this.showsettime = "";
  }
}
