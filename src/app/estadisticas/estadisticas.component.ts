import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GraficaComponent } from "../grafica/grafica.component"


export interface Variable {
  displayName: string;
  name: number;

}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})



export class EstadisticasComponent implements AfterViewInit {

  @ViewChild(GraficaComponent) private graph: GraficaComponent;

  variablesy: Variable[] = [
    {displayName:'Velocidad Terminal (m/s)', name: 3},
    {displayName: 'Potencia ofrecida por el panel solar (W)', name: 7},
    {displayName: 'Tiempo en alcanzar la velocidad terminal (s)', name: 5}]
  variablesx: Variable[] = [
    {displayName: 'Potencia ofrecida por el panel solar (W)', name: 7},
    {displayName: 'Intensidad Solar (lux)',  name: 11},
    {displayName: 'Direccion del Viento (rad)', name:13},
    {displayName: 'Intensidad del Viento (m/s)', name: 17}]
  cx: number = 0;
  cy: number = 0;
  selected: number
    

  constructor() {
    
  } 

  ngAfterViewInit(): void {
    this.graph.startCanvas(21)
    }


  actualizarGrafica(cx, cy){
    this.selected = cx*cy
    this.graph.startCanvas(this.selected)
    console.log(this.selected)
  }

}
