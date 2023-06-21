import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LatLng, MapOptions, marker, polyline, tileLayer ,Map, icon, Marker, Polyline} from 'leaflet';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
import { PatientsService } from 'src/app/core/services/patients/patients.service';
import { doorCords } from 'src/app/core/consts/doorCoord';
import { Subscription, interval } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [
    CommonModule,
    LeafletModule
  ]
})
export class MapComponent implements OnInit, OnDestroy{

  private intervalSubscription!: Subscription;
  map!: Map
  poly:any
  options :MapOptions =
  {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 30, attribution: '...' })
    ],
    zoom: 20,
    center: latLng(doorCords.lat,doorCords.lng)
  }
  @Input() puntos:any
  @Input() trazo:Array<LatLng> = []
  @Input() dni:any
  renderizado = false

  @ViewChild('map', {static: true})
  mapContainer!: ElementRef;

  constructor(private patientsService: PatientsService) { }

  cargarRuta(){
    if( this.trazo!=null && this.trazo.length > 0){
      if(this.map != undefined || this.map != null) {
        this.map.remove(); 
       } 
      this.map = new Map(this.mapContainer.nativeElement).setView([this.trazo[0]?.lat?.valueOf(),this.trazo[0]?.lng?.valueOf() ], 25);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.poly = new Polyline(this.trazo,{
        color: 'green',
        weight: 5
      })
      this.poly.addTo(this.map)

      setTimeout(()=>{this.map.invalidateSize(true)},500)
    }
    
  }

  recargarRuta(){
    
    this.getdatos()
    this.map.removeLayer(this.poly)
    this.poly = new Polyline(this.trazo,{
      color: 'green',
      weight: 5
    })
    console.log(this.trazo)
    this.poly.addTo(this.map)

  }

  getdatos(){

    this.patientsService.getPatient(this.dni).subscribe((data:any)=> {

      let recorrido = data.patient.incidences[0].recorrido_paciente
      this.trazo = []
      for(let punto of recorrido){
        console.log(punto)
      
        this.trazo.push(new LatLng(punto.latitud,punto.longitud))
      }
    })

  }

  ngOnInit(): void {

    console.log(this.mapContainer)
  
    console.log(this.map)


    if(this.puntos != null){
      if(this.map != undefined || this.map != null) {
        this.map.remove(); 
       } 
       console.log(this.puntos)
       if(this.puntos.length == 0){
        this.puntos[0].lat = doorCords.lat
        this.puntos[0].lng = doorCords.lng
       }
      this.map = new Map(this.mapContainer.nativeElement).setView([this.puntos[0].lat,this.puntos[0].lng],25);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      for(let i=0;i<this.puntos.length;i++){

        if(this.puntos[i]?.patient?.ruta_foto){
          marker([this.puntos[i].lat,this.puntos[i].lng],
            {
              icon: icon({
                iconUrl:this.puntos[i]?.patient?.ruta_foto,
                iconSize: [30,30]
              })
            }
            ).addTo(this.map).bindPopup(`
            <h2>
            ${this.puntos[i].patient.nombre}
            ${this.puntos[i].patient.apellidos}
            </h2>
            
            `)
        }
        else{
          marker([this.puntos[i].lat,this.puntos[i].lng],
            {
              icon: icon({
                iconUrl:'assets/imgs/patienticon.png',
                iconSize: [30,30]
              })
            }
            ).addTo(this.map).bindPopup(`
            <h2>
            ${this.puntos[i].patient.nombre}
            ${this.puntos[i].patient.apellidos}
            </h2>
            
            `)
        }

        


      }
      setTimeout(()=>{this.map.invalidateSize(true)},500)
    }
    console.log(this.trazo)
    if(this.trazo.length >0){
      this.cargarRuta()
    }
    if(this.dni){
      
      this.intervalSubscription = interval(5000).subscribe(() => {
        console.log("recargando");
        this.recargarRuta();
      });

      
      
    }



    marker(doorCords,{
      icon: icon({
        iconUrl:'assets/imgs/marker.png',
        iconSize: [20,20]
      })
    }).addTo(this.map)
    

  }



  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }




}
