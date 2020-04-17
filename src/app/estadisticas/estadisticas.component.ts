import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GraficaComponent } from "../grafica/grafica.component"
import { ViewEncapsulation } from '@angular/compiler/src/compiler_facade_interface';


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
    { displayName: 'Velocidad Terminal (m/s)', name: 3 },
    { displayName: 'Potencia ofrecida por el panel solar (W)', name: 7 },
    { displayName: 'Tiempo en alcanzar la velocidad terminal (s)', name: 5 }]
  variablesx: Variable[] = [
    { displayName: 'Potencia ofrecida por el panel solar (W)', name: 7 },
    { displayName: 'Intensidad Solar (lux)', name: 11 },
    { displayName: 'Dirección del Viento (rad)', name: 13 },
    { displayName: 'Intensidad del Viento (m/s)', name: 17 }]
  cx: number = 0;
  cy: number = 0;
  selected: number

  viento = 0;
  luz = 0;

  constructor() {

  }

  ngAfterViewInit(): void {
    this.graph.startCanvas(0)
  }


  formatLabel(value: number) {
    return value;
  }

  actualizarGrafica(cx, cy) {
    this.selected = cx * cy
    this.graph.startCanvas(this.selected)
    console.log(this.selected)
  }

  cambiarValorViento(event) {
    this.viento = event.value
    this.graph.constanteViento = event.value;
    console.log(this.graph.constanteViento)
  }

  cambiarValorLuz(event) {
    this.luz = event.value
    this.graph.constanteLuz = event.value;
  }

}
