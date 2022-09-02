import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService, ResponseDataForProduct } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name','stock','price','createdData','modifyData','tools'];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    this.showSpinnerWithoutHide(SpinnerName.LineSpinClockwiseFade);
    
    const allProducts: ResponseDataForProduct = await this.productService.getAll(this.paginator ? this.paginator.pageIndex:0,this.paginator ? this.paginator.pageSize:5,() => {
      this.hideSpinner(SpinnerName.LineSpinClockwiseFade);
    }, errorMessage => {
      this.alertify.message(errorMessage,{
        messageType: MessageType.error,
        position: Position.BottomCenter
      })
    });

    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length = allProducts.count;

  }

  async PaceChanged(){
    await this.getAll();
  }
}
