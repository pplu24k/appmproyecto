import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getIncidencias(){
    return this.httpClient.get('http://127.0.0.1:8000/api/incidences/in_progress')
  }

  getIncidencia(id:string){
    return this.httpClient.get('http://127.0.0.1:8000/api/incidences/'+id)
  }


}
