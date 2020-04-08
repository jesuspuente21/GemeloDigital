import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.css']
})


export class SimulacionComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Rendimiento del barco', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Simulacion', cols: 3, rows: 5, color: 'lightgreen'},
    {text: 'Valores para rendimiento optimo', cols: 2, rows: 2, color: 'lightpink'},
    {text: 'Sliders', cols: 2, rows: 3, color: '#DDBDF1'},
    {text: 'Distancia/tiempo/velocidadyaceleracion actual', cols: 3, rows: 2, color: 'yellow'},
  ];

  intensidadDelViento: number;
  intensidadLuminica: number;
  direccionDelViento: number;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarValorViento(event) {
    this.intensidadDelViento = event.value;
  }

  cambiarValorDirViento(event){
    this.direccionDelViento = event.value;
  }

  cambiarValorLuz(event) {
    this.intensidadLuminica = event.value;
  }

  formatLabel(value: number) {
    return value;
  }

}
