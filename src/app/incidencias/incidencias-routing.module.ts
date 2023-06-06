import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionIncidenciaComponent } from './pages/gestion-incidencia/gestion-incidencia.component';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';

const routes: Routes = [
  {
    path:'',
    component:IncidenciasComponent
  },
  {
    path:'gestion/:code',
    component:GestionIncidenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidenciasRoutingModule { }
