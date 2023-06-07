import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {


  user = 'Usuario'
  email = 'correo'

  constructor(private router:Router) { }

  ngOnInit() {}

  doLogout() {

    sessionStorage.removeItem('token')
    this.router.navigate(["/auth/login"])
  }

}
