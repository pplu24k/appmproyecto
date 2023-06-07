import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  user = {
    dni: '',
    password: ''
  }


  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {}

  doLogin(event:any) {
    event.preventDefault()
    console.log(this.user)

    this.loginService.doLogin(this.user).subscribe((data:any) => {
      
      console.log(data.access_token)
      sessionStorage.setItem("token",data.access_token)
      
      this.router.navigate(["/tabs/inicio"])

    })

  }

}
