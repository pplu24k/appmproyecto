import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidenciasRoutingModule } from './incidencias-routing.module';
import { IonicModule } from '@ionic/angular';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';
import { GestionIncidenciaComponent } from './pages/gestion-incidencia/gestion-incidencia.component';
import { MapComponent } from '../shared/map/map.component';


@NgModule({
  declarations: [
    IncidenciasComponent,
    GestionIncidenciaComponent
  ],
  imports: [
    CommonModule,
    IncidenciasRoutingModule,
    IonicModule,
    MapComponent
  ]
})
export class IncidenciasModule { }
