import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Profile } from 'src/app/core/models/profile';
import { UsersService } from 'src/app/core/services/users/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {


  telefono: string = ''
  email:string = ''


  perfil!: Profile

  constructor(private router:Router,
    private usersService: UsersService,
    private alertController: AlertController,
    ) { }

  ngOnInit() {
    this.usersService.getUser(sessionStorage.getItem("user") as string).subscribe((data:any) => {
      console.log(data)


      this.perfil = data.user

      console.log(this.perfil)

    })


  }

  checkEmail(email:string) {

    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return patron.test(email);
  }

  checkTelefono(numero:string) {

    const patron = /^\d{9}$/;

    return patron.test(numero);
  }

  updateTelefono(){

    if(this.checkTelefono(this.telefono)){
      this.usersService.updateTelefono(this.perfil.dni, this.telefono).subscribe((data) => {
        this.perfil.telefono = this.telefono
        this.mostrarConfirmacion('Teléfono actualizado')
    })
    }
    else{
      this.mostrarConfirmacion('Debes ingresar un teléfono correcto')
    }
  }

  updateEmail(){
    if(this.checkEmail(this.email)){
      this.usersService.updateEmail(this.perfil.dni,this.email).subscribe((data) => {
        this.perfil.email = this.email
        this.mostrarConfirmacion('Email actualizado')
      })
    }
    else{
      this.mostrarConfirmacion('Debes ingresar un email correcto')
    }

    
   }

   async mostrarConfirmacion(mensaje: string){
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

  doLogout() {

    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    this.router.navigate(["/auth/login"])
  }

}
