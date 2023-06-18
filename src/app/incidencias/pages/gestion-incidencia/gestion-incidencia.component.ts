import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
export class GestionIncidenciaComponent  implements OnInit {


  dni!:string;
  fechaParseada!:string
  //trazo: Array<LatLng> = [new LatLng(42.2020,-4.5313),new LatLng(42.2025,-4.5313),new LatLng(42.2025,-4.5317),new LatLng(42.2035,-4.5310)]
  trazo : Array<LatLng> = []
  trazoCargado = false
  datosIncidencia!: Incidence
  patientDatos: any

  constructor(  private route: ActivatedRoute,
    //private alertController: AlertController,
    private patientsService: PatientsService) { }


    ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dni= params.get('code') as string;

    });

    this.patientsService.getPatient(this.dni).subscribe((data:any) => {
      this.datosIncidencia = data.patient.incidences[0]
      this.patientDatos = data.patient
      console.log(data)

      this.parsearFecha()
      for(let punto of this.datosIncidencia.recorrido_paciente){
        this.trazo.push(new LatLng(punto.latitud,punto.longitud))
      }
      console.log(this.trazo)
      this.trazoCargado = true
      
    })


  }/*
  async mostrarConfirmacion(){
    const alert = await this.alertController.create({
      header: '¿Estás seguro de que deseas finalizar la incidencia?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }
*/

  parsearFecha(){
    let fechaStr = new Date(this.datosIncidencia.fecha_inicio)
    this.fechaParseada =  `${fechaStr.getHours()}:${fechaStr.getMinutes()} ${fechaStr.getDay()}/${fechaStr.getMonth()}/${fechaStr.getFullYear()}`

  }


}
