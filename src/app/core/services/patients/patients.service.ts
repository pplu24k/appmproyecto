import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getPatient(dni:string){
    return this.httpClient.get('http://localhost:8000/api/patients/'+dni)
  }

}
