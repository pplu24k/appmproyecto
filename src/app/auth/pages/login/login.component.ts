import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { LoginService } from 'src/app/core/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  esperando = false;
  user = {
    dni: '',
    password: ''
  }


  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  doLogin(event:any) {
    event.preventDefault()
    
   

    if(this.user.dni.length == 0 || this.user.password.length == 0 ){
      this.mostrarError('Debes ingresar los datos en ambos campos')
    }
    else{

      this.esperando = true
      this.loginService.doLogin(this.user)    .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.mostrarError('Credenciales inválidas')
        
          }
          
          this.esperando= false
          return of(null);
        })
      ).subscribe((data:any) => {
        this.esperando=false
        if(data != null){

          sessionStorage.setItem("token",data.access_token)
          sessionStorage.setItem("user",this.user.dni)
          this.router.navigate(["/tabs/inicio"])
        }


      })

    }

    


  }

  async mostrarError(mensaje:string){
    const alert = await this.alertController.create({
      header: mensaje,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

}
