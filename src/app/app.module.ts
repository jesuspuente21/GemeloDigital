import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimulacionComponent } from './simulacion/simulacion.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { P5modelComponent } from './p5model/p5model.component';
import { GraficaComponent } from './grafica/grafica.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SimulacionComponent,
    EstadisticasComponent,
    P5modelComponent,
    GraficaComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
