import { Component, AfterViewInit, Input } from '@angular/core';
import * as CanvasJS from './canvasjs.min';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements AfterViewInit {

  canvas: any;
  constanteResistencia = 0.3
  constantePotencia = 1.5
  constanteViento = 0.2
  constanteLuz = 1;

  constructor() { }

  ngAfterViewInit(): void {
    //this.startSketch(this.xvals, this.yvals);
    //this.startCanvas(15)
  }

  startCanvas(option) {
    console.log()
    let dataPoints = [];
    this.chooseGraph(dataPoints, option)
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      data: [
        {
          type: "line",
          dataPoints: dataPoints
        }]
    });

    chart.render();
  }

  chooseGraph(dataPoints, option) {
    let y = 0;
    while(dataPoints.length > 0) {
      dataPoints.pop();
  }
    switch(option){
      case 21://velocidad-potencia
      for (var i = 0; i < 10000; i++) {
        y = this.velocidadPotencia(i)
        dataPoints.push({ y: y });
      }
      break
      case 33://velocidad-sol
      for (var i = 0; i < 10000; i++) {
        y = this.velocidadIntensidadSolar(i)
        dataPoints.push({ y: y });
      }
      break
      case 39: //velocidad - dirviento
      for (var i = 0; i <  2* Math.PI; i+=0.01) {
        y = this.velocidadDireccionViento(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 51: //velocidad - viento
      for (var i = 0; i < 0.3; i++) {
        y = this.velocidadIntensidadViento(i)
        dataPoints.push({ y: y });
      }
      break
      case 35: //tiempo - potencia
      for (var i = 0; i < 10000; i++) {
        y = this.tiempoPotencia(i)
        dataPoints.push({ y: y });
      }
      break
      case 55: //tiempo - sol
      for (var i = 0; i < 10000; i++) {
        y = this.tiempoIntensidadSolar(i)
        dataPoints.push({ y: y });
      }
      break
      case 65: //tiempo - dirviento
      for (var i = 0; i < 2* Math.PI; i+=0.01) {
        y = this.tiempoDireccionViento(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 85: //tiempo- viento
      for (var i = 0; i < 10000; i++) {
        y = this.tiempoIntensidadViento(i)
        dataPoints.push({ y: y });
      }
      break
      case 77: // potencia - sol
      for (var i = 0; i < 10000; i++) {
        y = this.potenciaIntensidadSolar(i)
        dataPoints.push({ y: y });
      }
      break
      default: break;

    }
  }

  //Aceleracion
  potenciaIntensidadSolar = function (intensidadSolar) {
    return intensidadSolar * this.constanteLuz
  }

  //Velocidad terminal
  velocidadPotencia = function (potencia) {
    return Math.sqrt(potencia / this.constanteResistencia)
  }

  velocidadIntensidadSolar = function (intensidadSolar) {
    return this.velocidadPotencia(this.potenciaIntensidadSolar(intensidadSolar))
  }

  velocidadIntensidadViento = function (intensidadViento) {
    return this.velocidadPotencia(this.constantePotencia - intensidadViento)
  }

  velocidadDireccionViento = function (direccionViento) {
    return this.velocidadIntensidadViento(Math.cos(direccionViento) * this.constanteViento)
  }
  //Tiempo en alcanzar velocidad terminal
  tiempoPotencia = function (potencia) {
    return 3 * this.velocidadPotencia(potencia) / potencia
  }

  tiempoIntensidadSolar = function (intensidadSolar) {
    var potencia = this.potenciaIntensidadSolar(intensidadSolar)
    return 3 * this.velocidadPotencia(potencia) / potencia
  }

  tiempoIntensidadViento = function (viento) {
    return 3 * this.velocidadPotencia(this.constantePotencia - viento) / (this.constantePotencia - viento)
  }

  tiempoDireccionViento = function (direccionViento) {
    return this.tiempoIntensidadViento(this.constanteViento * Math.cos(direccionViento))
  }


}
