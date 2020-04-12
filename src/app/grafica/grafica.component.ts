import { Component, AfterViewInit, Input } from '@angular/core';
import * as CanvasJS from './canvasjs.min';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements AfterViewInit {

  canvas: any;
  constanteResistencia = 0.05;
  constanteViento = 0;
  constanteLuz = 0;
  constantePotenciaLuz = 0.0015;

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
      for (var i = 0; i < 12; i+=0.1) {
        y = this.velocidadPotencia(i, 0)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 33://velocidad-sol
      for (var i = 0; i < 7000; i++) {
        y = this.velocidadIntensidadSolar(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 39: //velocidad - dirviento
      for (var i = 0; i <  2* Math.PI; i+=0.01) {
        y = this.velocidadDireccionViento(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 51: //velocidad - viento
      for (var i = 0; i < 100; i++) {
        this.constanteViento = 0;
        y = this.velocidadIntensidadViento(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 35: //tiempo - potencia
      for (var i = 0; i < 12; i+=0.1) {
        y = this.tiempoPotencia(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 55: //tiempo - sol
      for (var i = 0; i < 7000; i++) {
        y = this.tiempoIntensidadSolar(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 65: //tiempo - dirviento
      for (var i = 0; i < 2* Math.PI; i+=0.01) {
        y = this.tiempoDireccionViento(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 85: //tiempo- viento
      this.constanteViento = 0;
      for (var i = 0; i < 100; i++) {
        y = this.tiempoIntensidadViento(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      case 77: // potencia - sol
      for (var i = 0; i < 7000; i++) {
        y = this.potenciaIntensidadSolar(i)
        dataPoints.push({x: i,  y: y });
      }
      break
      default: break;

    }
  }

  //Aceleracion
  potenciaIntensidadSolar = function (intensidadSolar) {
    return intensidadSolar * this.constantePotenciaLuz
  }

  //Velocidad terminal
  velocidadPotencia = function (potencia, viento) {
    return Math.sqrt(Math.abs((potencia/12*0.004) - this.constanteViento/100*0.0005 - viento/100*0.0005) / this.constanteResistencia) * 60
  }

  velocidadIntensidadSolar = function (intensidadSolar) {
    return this.velocidadPotencia(this.potenciaIntensidadSolar(intensidadSolar), 0) 
  }

  velocidadIntensidadViento = function (intensidadViento) {

    return this.velocidadPotencia(this.potenciaIntensidadSolar(this.constanteLuz),  intensidadViento)
  }

  velocidadDireccionViento = function (direccionViento) {
    return this.velocidadIntensidadViento(Math.cos(direccionViento) * this.constanteViento)
  }
  //Tiempo en alcanzar velocidad terminal
  tiempoPotencia = function (potencia) {
    return 3 * this.velocidadPotencia(potencia, 0) / (Math.abs(potencia/12*0.004 - this.constanteViento/100*0.0005)*60/this.constanteResistencia)
  }

  tiempoIntensidadSolar = function (intensidadSolar) {
    var potencia = this.potenciaIntensidadSolar(intensidadSolar)
    return 3 * this.velocidadPotencia(potencia, 0) / (Math.abs(potencia/12*0.004 - this.constanteViento/100*0.0005)*60/this.constanteResistencia)
  }

  tiempoIntensidadViento = function (viento) {
    var potencia = this.potenciaIntensidadSolar(this.constanteLuz)
    return 3 * this.velocidadPotencia(potencia, viento) / (Math.abs(potencia/12*0.004 - viento/100*0.0005)*60/this.constanteResistencia)
  }

  tiempoDireccionViento = function (direccionViento) {
    return this.tiempoIntensidadViento(this.constanteViento * Math.cos(direccionViento))
  }


}
