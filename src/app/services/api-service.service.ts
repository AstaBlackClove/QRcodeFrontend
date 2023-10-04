import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  Url = 'https://blushing-zipper-yak.cyclic.cloud';
  // Url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  baseQrCode(data:any){
    return this.http.post(`${this.Url}/baseQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  vCard(data:any){
    return this.http.post(`${this.Url}/vCard`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  mailQrCode(data:any){
    return this.http.post(`${this.Url}/mailQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  wifiQrCode(data:any){
    return this.http.post(`${this.Url}/wifiQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  cryptoQrCode(data:any){
    return this.http.post(`${this.Url}/cryptoQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  youtubeQrCode(data:any){
    return this.http.post(`${this.Url}/youtubeQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  facebookQrCode(data:any){
    return this.http.post(`${this.Url}/facebookQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  instQrCode(data:any){
    return this.http.post(`${this.Url}/instaQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  tweetQrCode(data:any){
    return this.http.post(`${this.Url}/tweetQrCode`,data),pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  linkedInQrCode(data:any){
    return this.http.post(`${this.Url}/linkedInQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  whatsappQrCode(data:any){
    return this.http.post(`${this.Url}/whatsappQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  barCode(data:any){
    return this.http.post(`${this.Url}/code128`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }



  private handleError(httpError: HttpErrorResponse){
    let message:string = '';
    let status = httpError.status;

    if(status == 401){
      console.log(status)
    }

    if(httpError instanceof ProgressEvent){
      console.log('in Progress Event');
      message = 'Network Error'
    }else{
      if (httpError.error && httpError.error.message) {
        message = httpError.error.message;
        console.error(`Backend returned code ${status}. Body was ${httpError.error}`);
      } else {
        message = 'An unexpected error occurred';
        console.error(`Backend returned code ${status}. Error object:`, httpError);
      }
    }
    return throwError(message);
  }
}
