import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProduct } from 'src/app/contracts/list-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: any, errorCallBack?: any ) {
   this.httpClientService.post({
      controller: "products"
    },product).subscribe(data => {

      successCallBack();
      
    }, (errorResponse: HttpErrorResponse)=> {
      const _errors : Array<{key: string, value: Array<string>}> = errorResponse.error;
      
      let message = ""

      _errors.forEach((v, index) => {
        v.value.forEach((_v, _index) =>{
          message += `${_v}</br>`;
        })
      });

      errorCallBack(message);
    });
  }

  async getAll(page:number=0, size:number=5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ResponseDataForProduct>{
    const promiseData: Promise<ResponseDataForProduct> =  this.httpClientService.get<ResponseDataForProduct>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
    .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string){
    const deleteObs: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObs);
  }
}

export class ResponseDataForProduct{
  count:number;
  products:ListProduct[];
}