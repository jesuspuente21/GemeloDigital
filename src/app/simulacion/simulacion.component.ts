import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { P5modelComponent } from "../p5model/p5model.component"

export interface Tile {
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

  @ViewChild(P5modelComponent) private mapa: P5modelComponent;

  tiles: Tile[] = [
    {text: 'Logo', cols: 2, rows: 2},
    {text: 'Simulacion', cols: 3, rows: 5},
    {text: 'Valores Simulados', cols: 2, rows: 2},
    {text: 'Variables de Entrada', cols: 2, rows: 3},
    {text: 'Factor limitante: ', cols: 2, rows: 2},
    {text: 'Controles', cols: 1, rows: 2},
  ];

  intensidadDelViento: number;
  intensidadLuminica: number;
  direccionDelViento: number;
  anguloDeGiro: number;
  velocidadInicial: number;
  tiempo: number;
  distancia: number;
  tiempoEsCero: number;
  plano: P5modelComponent

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.intensidadDelViento = params.v;
      this.intensidadLuminica = params.sol;
      this.direccionDelViento = params.dirv;
      this.anguloDeGiro = params.giro;
      this.velocidadInicial = params.vel;
      this.tiempo = params.t;
      this.distancia = params.d;
      this.tiempoEsCero = params.lim
      this.velocidadInicial = params.vi
      this.plano = this.mapa;
    });
  }

  ngOnInit(): void {
  }

}
