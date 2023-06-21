import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LatLng } from 'leaflet';
import { Incidence } from 'src/app/core/models/incidence';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
import { PatientsService } from 'src/app/core/services/patients/patients.service';

@Component({
  selector: 'app-gestion-incidencia',
  templateUrl: './gestion-incidencia.component.html',
  styleUrls: ['./gestion-incidencia.component.scss'],
})
export class GestionIncidenciaComponent  implements OnInit  {


  id!:string;
  
  fechaParseada!:string
  //trazo: Array<LatLng> = [new LatLng(42.2020,-4.5313),new LatLng(42.2025,-4.5313),new LatLng(42.2025,-4.5317),new LatLng(42.2035,-4.5310)]
  trazo : Array<LatLng> = []
  trazoCargado = false
  datosIncidencia!: Incidence
  patientDatos: any
  recorrido: any
  constructor(  private route: ActivatedRoute,
    //private alertController: AlertController,
    private patientsService: PatientsService,
    private incidenciasService: IncidenciasService
    ) { }


    recargarRuta(){
      for(let punto of this.recorrido){
        this.trazo.push(new LatLng(punto.latitud,punto.longitud))
      }

    }

    ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id= params.get('code') as string;

    });

    this.incidenciasService.getIncidencia(this.id).subscribe((data:any) => {

      console.log(data.incidences.patient.dni)

      this.recorrido = data.incidences.recorrido_paciente
      this.recargarRuta()
      this.trazoCargado = true


      this.patientsService.getPatient(data.incidences.patient.dni).subscribe((data:any) => {
        this.datosIncidencia = data.patient.incidences[0]
        this.patientDatos = data.patient
  
        
        this.parsearFecha()
  
  
        
      })

    })






  }
  
  


  parsearFecha(){
    let fechaStr = new Date(this.datosIncidencia.fecha_inicio)
    this.fechaParseada =  `${fechaStr.getHours()}:${fechaStr.getMinutes()} ${fechaStr.getDay()}/${fechaStr.getMonth()}/${fechaStr.getFullYear()}`

  }


}
