import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LatLng } from 'leaflet';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';

@Component({
  selector: 'app-gestion-incidencia',
  templateUrl: './gestion-incidencia.component.html',
  styleUrls: ['./gestion-incidencia.component.scss'],
})
export class GestionIncidenciaComponent  implements OnInit {


  dni!:string;

  //trazo: Array<LatLng> = [new LatLng(42.2020,-4.5313),new LatLng(42.2025,-4.5313),new LatLng(42.2025,-4.5317),new LatLng(42.2035,-4.5310)]
  trazo : Array<LatLng> = []
  trazoCargado = false
  datosIncidencia: any


  constructor(  private route: ActivatedRoute,
    private alertController: AlertController,
    private incidenciasService: IncidenciasService) { }


    ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dni= params.get('code') as string;

    });

    this.incidenciasService.getIncidencias().subscribe((data:any) => {
      this.datosIncidencia = data.find((datos:any) => datos.dni === this.dni)
      console.log(this.datosIncidencia)
      for(let punto of this.datosIncidencia.route){
        this.trazo.push(new LatLng(punto.x,punto.y))
      }
      console.log(this.trazo)
      this.trazoCargado = true
    })


  }
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



}
