import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  latLng,
  LatLng,
  MapOptions,
  marker,
  polyline,
  tileLayer,
  Map,
  icon,
  Marker,
  Polyline,
  polygon,
  LatLngExpression,
} from 'leaflet';
import { IncidenciasService } from 'src/app/core/services/incidencias/incidencias.service';
import { PatientsService } from 'src/app/core/services/patients/patients.service';
import { doorCords } from 'src/app/core/consts/doorCoord';
import { Subscription, interval } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [CommonModule, LeafletModule],
})
export class MapComponent implements OnInit, OnDestroy {
  private intervalSubscription!: Subscription;
  map!: Map;
  poly: any;
  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
        attribution: '...',
      }),
    ],
    zoom: 20,
    center: latLng(doorCords.lat, doorCords.lng),
  };
  @Input() puntos: any;
  @Input() trazo: Array<LatLng> = [];
  @Input() incidenciaId: any;
  renderizado = false;

  @ViewChild('map', { static: true })
  mapContainer!: ElementRef;
  pacientMarker : any
  constructor(private incidenciasService: IncidenciasService) {}

  cargarRuta() {
    if (this.trazo != null && this.trazo.length > 0) {
      if (this.map != undefined || this.map != null) {
        this.map.remove();
      }
      this.map = new Map(this.mapContainer.nativeElement).setView(
        [this.trazo[this.trazo.length-1]?.lat?.valueOf(), this.trazo[this.trazo.length-1]?.lng?.valueOf()],
        25
      );
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );
      this.poly = new Polyline(this.trazo, {
        color: 'green',
        weight: 5,
      });
      this.poly.addTo(this.map);


      setTimeout(() => {
        this.map.invalidateSize(true);
      }, 500);
    }
  }





  getdatos() {
    this.incidenciasService
      .getIncidencia(this.incidenciaId)
      .subscribe((data: any) => {
        let recorrido = data.incidences.recorrido_paciente;
        this.trazo = [];
        for (let punto of recorrido) {

          this.trazo.push(new LatLng(punto.latitud, punto.longitud));
        }
        this.map.removeLayer(this.poly);
        this.poly = new Polyline(this.trazo, {
          color: 'green',
          weight: 5,
        });
        if(this.pacientMarker){
          this.map.removeLayer(this.pacientMarker)
        }
        console.log(this.trazo[this.trazo.length-1])
        this.pacientMarker = marker(this.trazo[this.trazo.length-1], {
          icon: icon({
            iconUrl: 'assets/imgs/patienticon.png',
            iconSize: [30, 30],
          })
        })
        

        this.poly.addTo(this.map);
        this.pacientMarker.addTo(this.map)
      });
  }

  ngOnInit(): void {
    if (this.puntos != null) {
      if (this.map != undefined || this.map != null) {
        this.map.remove();
      }

      if (this.puntos.length == 0) {
        this.puntos[0].lat = doorCords.lat;
        this.puntos[0].lng = doorCords.lng;
      }
      this.map = new Map(this.mapContainer.nativeElement).setView(
        [this.puntos[0].lat, this.puntos[0].lng],
        25
      );
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );
      for (let i = 0; i < this.puntos.length; i++) {
        if (this.puntos[i]?.patient?.ruta_foto) {
          marker([this.puntos[i].lat, this.puntos[i].lng], {
            icon: icon({
              iconUrl: 'assets/imgs/patienticon.png',
              iconSize: [30, 30],
            }),
          }).addTo(this.map).bindPopup(`
            <h2>
            ${this.puntos[i].patient.nombre}
            ${this.puntos[i].patient.apellidos}
            </h2>
            
            `);
        } else {
          marker([this.puntos[i].lat, this.puntos[i].lng], {
            icon: icon({
              iconUrl: 'assets/imgs/patienticon.png',
              iconSize: [30, 30],
            }),
          }).addTo(this.map).bindPopup(`
            <h2>
            ${this.puntos[i].patient.nombre}
            ${this.puntos[i].patient.apellidos}
            </h2>
            
            `);
        }
      }
      setTimeout(() => {
        this.map.invalidateSize(true);
      }, 500);
    }

    if (this.trazo.length > 0) {
      this.cargarRuta();
    }
 
    if (this.incidenciaId) {

      this.intervalSubscription = interval(5000).subscribe(() => {
        this.getdatos();
      });
    }

    

    marker(doorCords, {
      icon: icon({
        iconUrl: 'assets/imgs/marker.png',
        iconSize: [20, 20],
      }),
    }).addTo(this.map);

    const area:LatLngExpression[] = [

      
      [42.013671, -4.539064],

      [42.013382, -4.538817],

      [42.013521, -4.538661],

      [42.013699, -4.538807],

      [42.01375, -4.538694],

      [42.013914, -4.538791],

      [42.013811, -4.539011],

      [42.013726, -4.538952]

  ];

  const areaPolygon = polygon(area).addTo(this.map);

  areaPolygon.bindPopup("Centro Grupo Fundación San Cebrián");
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
