import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Servicios {
  
  constructor(private httpClient: HttpClient) {}

  private backendURL = 'http://localhost:3000';

  login(data: any) {
    return this.httpClient.post(`${this.backendURL}/login`, data)
      .pipe(
        tap((res:any) => {
          JSON.stringify(res)
        })
      );
  }
}
