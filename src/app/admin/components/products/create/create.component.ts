import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private aletify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinnerWithoutHide(SpinnerName.LineSpinClockwiseFade);
    let product: CreateProduct = new CreateProduct();

    product.name = name.value;
    product.stock = parseInt(stock.value);
    product.price = parseFloat(price.value);

    this.productService.create(product, () => {
      this.hideSpinner(SpinnerName.LineSpinClockwiseFade),
        this.aletify.message('Melumat elvae edildi', {
          messageType: MessageType.success,
          position: Position.TopCenter,
        });
    });
  }
}
