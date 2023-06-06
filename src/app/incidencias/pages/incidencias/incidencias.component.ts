import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.scss'],
})
export class IncidenciasComponent  implements OnInit {

  incidencias: any

  constructor(
    private incidenciasService: IncidenciasService
  ) { }

  ngOnInit() {

    this.incidenciasService.getIncidencias().subscribe((data) => {
      console.log(data)
      this.incidencias = data
    })
  }

}
