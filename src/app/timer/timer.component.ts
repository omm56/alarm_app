import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  // input values;
  hh = '00';
  mm = '00';
  ss = '00';
  
  h: number | any;
  m: number | any;    
  s: number | any;

  startTimer: any
  running = false;

  ngOnInit() { }
  start(): void {
      this.running = true;
      this.h = parseInt(this.hh);
      this.m = parseInt(this.mm);
      this.s = parseInt(this.ss);
      this.startTimer = setInterval(() => {
        if (this.s >= 0) {
          this.s = this.s < 10 ?  '0' + this.s : this.s;
          if (this.h == 0 && this.m == 0 && this.s == 0) {
            clearInterval(this.startTimer)
            return
          }
          if (this.s == '00') {
            this.stopTimer()
            if (this.m != '00') {
              this.m = this.m - 1;
              this.m = this.m < 10 ? '0' + this.m : this.m;
              this.s = 59;
            }else if (this.m == '00' && this.h != '00') {
              this.h = this.h - 1
              this.h = this.h < 10 ? '0' + this.h : this.h;
              this.s = 59;
              this.m = 59;
            }else if (this.h == '00'){
              this.s = 59;
              this.m = 59;
            }
          }
          
        }
        this.s = this.s - 1;
        console.log("counter:", this.h, this.m, this.s)
      }, 1000)
  }
  stopTimer() {
    if (this.h == 0 && this.m == 0 && this.s == 0) {
      clearInterval(this.startTimer)
    }
  }
  resume(){
    if(!this.running){
      this.running = true;
      this.startTimer = setInterval(() => {
        if (this.s >= 0) {
          this.s = this.s < 10 ? '0' + this.s : this.s;
          if (this.h == 0 && this.m == 0 && this.s == 0) {
            clearInterval(this.startTimer)
            return
          }
          if (this.s == '00') {
            this.stopTimer()
            if (this.m != '00') {
              this.m = this.m - 1;
              this.m = this.m < 10 ? '0' + this.m : this.m;
              this.s = 59;
            }else if (this.m == '00' && this.h != '00') {
              this.h = this.h - 1
              this.h = this.h < 10 ? '0' + this.h : this.h;
              this.s = 59;
              this.m = 59;
            }else if (this.h == '00'){
              this.s = 59;
              this.m = 59;
            }
          }
          console.log("counter:", this.h, this.m, this.s)
        }
        this.s = this.s - 1;
        
      }, 1000)
  
    }else{
      this.pause();
    }
  }
  pause():void {
    clearInterval(this.startTimer)
    this.running = false;
   }
  clear() {
    if (this.h != 0 || this.m != 0 || this.s != 0) {
      clearInterval(this.startTimer)
      this.hh = "00";
      this.mm = "00";
      this.ss = "00";

      this.h = "00";
      this.m = "00";
      this.s = "00";
    }
  }
  blank(){
    this.hh = "";
    this.mm = "";
    this.ss = "";
  }
}