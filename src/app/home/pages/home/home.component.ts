import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
import { LatLng } from 'leaflet';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  puntos: any

  constructor(
    private incidencias: IncidenciasService
  ) { }
  ngOnInit(): void {

    this.incidencias.getIncidencias().subscribe((data:any) => {


      this.puntos = data
      console.log(this.puntos)
    })

  }





}
