import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from "../shared/map/map.component";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        IonicModule,
        LeafletModule,
        MapComponent
    ]
})
export class HomeModule { }
