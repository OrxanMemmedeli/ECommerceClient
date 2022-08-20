import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';

@Component({
  selector: 'app-poroducts',
  templateUrl: './poroducts.component.html',
  styleUrls: ['./poroducts.component.scss']
})
export class PoroductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerName.Timer);
  }

}
