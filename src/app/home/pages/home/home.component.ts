import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
import { LatLng } from 'leaflet';
import { Incidence } from 'src/app/core/models/incidence';
import { doorCords } from 'src/app/core/consts/doorCoord';
import { interval } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  incidencias!: Incidence []
  puntos: any[] = []

  constructor(
    private incidenciasService: IncidenciasService
  ) { }
  ngOnInit(): void {

    this.incidenciasService.getIncidencias().subscribe((data:any) => {



      this.incidencias = data.incidences
      if(this.incidencias.length != 0){
      
      for(let incidencia of this.incidencias){
        this.puntos.push({
          lat: incidencia.recorrido_paciente[incidencia.recorrido_paciente.length-1].latitud,
          lng:incidencia.recorrido_paciente[incidencia.recorrido_paciente.length-1].longitud,
          patient: incidencia.patient
      })
      }
 
    }
    })

  }





}
