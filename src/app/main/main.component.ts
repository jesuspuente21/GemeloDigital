import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from "@angular/router";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  mobileQuery: MediaQueryList;
  intensidadDelViento: number;
  intensidadLuminica: number;
  direccionDelViento: number;
  giro: number;
  tiempo: number;
  distancia: number;
  limitacion: number= 0;

  private _mobileQueryListener: () => void;

  constructor(private route: ActivatedRoute, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.intensidadDelViento = 0;;
    this.intensidadLuminica = 0;
    this.direccionDelViento = 0;
    this.giro = 0;
    this.tiempo = 0;
    this.distancia = 0;
  
  }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    return value;
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

  cambiarValorGiro(event) {
    this.giro = event.value;
  }

  cambiarValorTiempo(event) {
    this.tiempo = event.value;
  }

  cambiarValorDistancia(event) {
    this.distancia = event.value;
  }
}
