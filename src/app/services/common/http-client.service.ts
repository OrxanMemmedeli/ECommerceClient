import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private CreateUrl(rP: Partial<RequestParameters>) {
    if (rP.fullEndPonit) {
      return rP.fullEndPonit;
    } else {
      return `${rP.baseUrl ? rP.baseUrl : this.baseUrl}/${rP.controller}${rP.action ? `/${rP.action}` : ''}`;
    }
  }

  get<T>(requestParameters: Partial<RequestParameters>, id?: string) : Observable<T> {
    let url: string = `${this.CreateUrl(requestParameters)}${id ? `/${id}`:""}`;

    return this.httpClient.get<T>(url, {headers: requestParameters.headers});
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>) : Observable<T> {
    let url: string = `${this.CreateUrl(requestParameters)}`;

    return this.httpClient.post<T>(url,body, {headers : requestParameters.headers});
  }

  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>) : Observable<T>{
    let url: string = `${this.CreateUrl(requestParameters)}`;

    return this.httpClient.put<T>(url, body, {headers: requestParameters.headers});
  }

  delete<T>(requestParameters: Partial<RequestParameters>, id?: string) : Observable<T> {
    let url: string = `${this.CreateUrl(requestParameters)}/${id}`;
    
    return this.httpClient.delete<T>(url, {headers: requestParameters.headers});
  }
}


//sinifi new etmek evezine JS obyekti kimi istifade etmek ucun Partial keyWord0u ist edilir
export class RequestParameters {
  controller?: string;
  action?: string;

  headers?: HttpHeaders; //header gonderme telebi yaranan zaman istifade ucun
  baseUrl?: string; // baseUrl den basqa url uzre isden gondere bilme ucun
  fullEndPonit?: string; //eger butun teleblerden elave adrese muraciet etme telebi yaranarsa ist edilmek ucun
}
