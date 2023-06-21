import { Component, OnInit } from '@angular/core';
import { FollowUp } from 'src/app/core/models/follow-up';
import { Incidence } from 'src/app/core/models/incidence';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.scss'],
})
export class IncidenciasComponent  implements OnInit {

  incidencias!: Incidence[]

  constructor(
    private incidenciasService: IncidenciasService
  ) { }

  ngOnInit() {

    this.incidenciasService.getIncidencias().subscribe((data:any) => {
      console.log(data)
      this.incidencias = data.incidences
    })
  }

  parsearFecha(fecha: string){
    let fechaStr = new Date(fecha)
    return `${fechaStr.getHours()}:${fechaStr.getMinutes()} ${fechaStr.getDay()}/${fechaStr.getMonth()}/${fechaStr.getFullYear()}`

  }

}
