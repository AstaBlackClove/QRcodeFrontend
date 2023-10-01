import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  Url = 'https://qrcodebackend-9l9t.onrender.com';

  constructor(private http: HttpClient) { }

  baseQrCode(data:any){
    this.http.post(`${this.Url}/baseQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  vCard(data:any){
    this.http.post(`${this.Url}/vCard`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  mailQrCode(data:any){
    this.http.post(`${this.Url}/mailQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  wifiQrCode(data:any){
    this.http.post(`${this.Url}/wifiQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  cryptoQrCode(data:any){
    this.http.post(`${this.Url}/cryptoQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  youtubeQrCode(data:any){
    this.http.post(`${this.Url}/youtubeQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  facebookQrCode(data:any){
    this.http.post(`${this.Url}/facebookQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  instQrCode(data:any){
    this.http.post(`${this.Url}/instaQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  tweetQrCode(data:any){
    this.http.post(`${this.Url}/tweetQrCode`,data),pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  linkedInQrCode(data:any){
    this.http.post(`${this.Url}/linkedInQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  whatsappQrCode(data:any){
    this.http.post(`${this.Url}/whatsappQrCode`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }

  barCode(data:any){
    this.http.post(`${this.Url}/code128`,data).pipe(catchError(err => this.handleError(err)),map((res) => {
      return res;
    }))
  }



  private handleError(httpError: HttpErrorResponse){
    let message = '';
    let ststus = httpError.status;

    if(ststus == 401){
      console.log(ststus)
    }

    if(httpError instanceof ProgressEvent){
      console.log('in Progress Event');
      message = 'Network Error'
    }else{
      message = httpError.error.message;
      console.error(`Backend returned code` + `Body was ${httpError.error}`)
    }
    return throwError(message);
  }
}
