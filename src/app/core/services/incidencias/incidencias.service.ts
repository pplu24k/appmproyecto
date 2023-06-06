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
    return this.httpClient.get('/assets/incidencias.json')
  }


}
