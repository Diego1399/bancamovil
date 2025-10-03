import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { Servicios } from '../../services/servicios'
import { Usuarios } from '../../services/usuarios'

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(
    private router: Router, 
    private servicios: Servicios,
    private usuarios: Usuarios
  ) {}

  user = {
    username: '',
    password: '',
  }

  login() {
    console.log(this.user);
    this.servicios.login(this.user).subscribe(res => {
      this.usuarios.setUsuario({user: res.user, token: res.token})
      this.router.navigate(['home']);
    })
  }
}
