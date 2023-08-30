import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getRequest(route: string, queries?: Object, headers?: Object): Observable<any> {
    let reqHeaders = new HttpHeaders();
    let reqParams = new HttpParams();

    if (headers) {
      Object.getOwnPropertyNames(headers).forEach((key) => {
        reqHeaders = reqHeaders.set(key, headers[key]);
      });
    }

    if (queries) {
      Object.getOwnPropertyNames(queries).forEach((key) => {
        reqParams = reqParams.set(key, queries[key]);
      });
    }

    return this.http.get(route, {
      headers: reqHeaders,
      params: reqParams,
      responseType: "json",
      withCredentials: false,
    });
  }
  

  getInfo(area:any,location:any):Observable<any> {
    return this.http.get(`https://worldtimeapi.org/api/timezone/${area}/${location}`)
  }


  postRequest(route: string, data?: any, queries?: Object, headers?: Object) {
    let reqHeaders = new HttpHeaders();
    let reqParams = new HttpParams();

    if (headers) {
      Object.getOwnPropertyNames(headers).forEach((key) => {
        reqHeaders = reqHeaders.set(key, headers[key]);
      });
    }

    if (queries) {
      Object.getOwnPropertyNames(queries).forEach((key) => {
        reqParams = reqParams.set(key, queries[key]);
      });
    }

    return this.http.post(route, data, {
      headers: reqHeaders,
      params: reqParams,
      responseType: "json",
      withCredentials: false,
    });
  }
}