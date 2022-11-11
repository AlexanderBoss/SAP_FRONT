import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginServices } from '../services/login.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [loginServices]
})
export class LoginComponent implements OnInit {
  constructor(
    public router: Router,
    public _loginServices: loginServices,
  ) {}

  nombre_usuario: string = '';
  password_usuario: string = '';

  ngOnInit(): void {
    localStorage.getItem("usuario")
  }
  login(){
    let parameter = {
      c_username: this.nombre_usuario,
      c_password: this.password_usuario
    }
    this._loginServices.autenticar(parameter).subscribe(
      result =>{
        console.log(result.data);
        
        if (result.data) {
          console.log("REGISTRADO");
          localStorage.setItem("usuario",result.data.c_nombre1);
          this.router.navigate(['/menu']);
        }else{
          alert("***Usuario no encontrado***")
          
        }

      }, error =>{
        console.log(error.error);
      }
    );
    console.log(this.nombre_usuario);
    console.log(this.password_usuario);
  }
}
