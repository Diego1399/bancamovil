import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Servicios } from '../../services/servicios'
import { Usuarios } from '../../services/usuarios'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;


  constructor (
    private router: Router, 
    private servicios: Servicios,
    private usuarios: Usuarios
  ) {
  }

  ngOnInit() {
    this.user = this.usuarios.getUsuario().user;
    console.log('homepage')
    console.log(this.user)
  }

  
}
