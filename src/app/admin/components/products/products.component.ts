import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerName.Timer);
    this.getAll();
  }

  getAll(){
    this.httpClientService.get(
      {
        controller: "products"
      }
    ).subscribe(data => {
      console.log(data);
    });
  }

  create(){
    this.httpClientService.post(
      {
        controller: "products"
      },
      {
        name: "ClientFisrtData",
        stock: 100,
        price: 15
      }
    ).subscribe(data => {
      console.log(data);
    });
  }

  update(){
    this.httpClientService.put(
      {
        controller: "products"
      },
      {
        id: "71e2d138-b5ba-4f20-6e15-08da82ac042a",
        name: "Updated Data",
        price: 55
      }
    ).subscribe(data => {
      console.log(data);
    });
  }

  deleteData(){
    this.httpClientService.delete(
      {
        controller: "products"
      },
      "71e2d138-b5ba-4f20-6e15-08da82ac042a"
    ).subscribe(data => {
      console.log(data);
      console.log("data");
    });
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(createdProduct: CreateProduct) {
    this.listComponents.getAll();
  }

  get(){
    this.httpClientService.get(
      {
        controller: "products"
      },
      "71e2d138-b5ba-4f20-6e15-08da82ac042a"
    ).subscribe(data => {
      console.log(data);
    });
  }
}
