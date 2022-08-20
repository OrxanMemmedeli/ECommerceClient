import { splitNsName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService){}

  showSpinner(spinnerName: SpinnerName){
    this.spinner.show(spinnerName);

    setTimeout(() => {
      this.hideSpinner(spinnerName)
    }, 3000);
  }

  hideSpinner(spinnerName: SpinnerName){
    this.spinner.hide(spinnerName);
  }
}

export enum SpinnerName{
  BallAtom = "ball-atom",
  LineSpinClockwiseFade = "line-spin-clockwise-fade",
  SquareJellyBox = "square-jelly-box",
  Timer = "timer"
}
