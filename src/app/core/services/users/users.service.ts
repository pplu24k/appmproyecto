import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(){

    return this.httpClient.get('http://localhost:8000/api/user-profile')
  }

  updateEmail(email:string){

    return this.httpClient.put('http://localhost:8000/api/user-profile' ,{email})
  }

  updateTelefono(dni: string, telefono: string){

    return this.httpClient.put('http://localhost:8000/api/user-profile', {telefono})
  }


}
