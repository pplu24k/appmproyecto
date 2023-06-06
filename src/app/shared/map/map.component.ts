import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LatLng, MapOptions, marker, polyline, tileLayer ,Map, icon} from 'leaflet';
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
export class MapComponent implements OnInit{
  map: any
  options :MapOptions =
  {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  }
  @Input() puntos:any
  @Input() trazo:Array<LatLng> = []
  renderizado = false

  @ViewChild('map', {static: true})
  mapContainer!: ElementRef;

  constructor() { }
  ngOnInit(): void {

    console.log(this.mapContainer)
  
    console.log(this.map)


    if(this.puntos != null){
      if(this.map != undefined || this.map != null) {
        this.map.remove(); 
       } 

      this.map = new Map(this.mapContainer.nativeElement).setView([42.2020,-4.5313], 13);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);
      this.map.invalidateSize()
      for(let i=0;i<this.puntos.length;i++){

        marker([this.puntos[i].route.at(-1).x,this.puntos[i].route.at(-1).y],
          {
            icon: icon({
              iconUrl:this.puntos[i].image,
              iconSize: [30,30]
            })
          }
          ).addTo(this.map).bindPopup(`
          <h2>
          ${this.puntos[i].firstName}
          ${this.puntos[i].lastName}
          </h2>
          
          `)
      }
    }
    console.log(this.trazo)
    if( this.trazo!=null && this.trazo.length > 0){
      if(this.map != undefined || this.map != null) {
        this.map.remove(); 
       } 
      this.map = new Map(this.mapContainer.nativeElement).setView([this.trazo[0].lat.valueOf(),this.trazo[0].lng.valueOf() ], 13);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);
      polyline(this.trazo,{
        color: 'green',
        weight: 5
      }).addTo(this.map)
    }
    setTimeout(()=>{this.map.invalidateSize(true)},500)


    //const markerItem = marker([42.2020,-4.5313]).addTo(map).bindPopup("Posible salida")
    /*map.fitBounds(
      [markerItem.getLatLng().lat as any,markerItem.getLatLng().lng as any]
    )*/
  }



}
