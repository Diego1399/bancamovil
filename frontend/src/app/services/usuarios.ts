import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Usuarios {
  private user: any = null;

  setUsuario(user: any) {
    this.user = user;
  }

  getUsuario() {
    return this.user
  }

}