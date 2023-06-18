import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(dni: string){

    return this.httpClient.get('http://localhost:8000/api/users/' + dni)
  }

  updateEmail(dni: string, email: string){

    return this.httpClient.put('http://localhost:8000/api/users/' + dni, {email})
  }

  updateTelefono(dni: string, telefono: string){

    return this.httpClient.put('http://localhost:8000/api/users/' + dni, {telefono})
  }


}
