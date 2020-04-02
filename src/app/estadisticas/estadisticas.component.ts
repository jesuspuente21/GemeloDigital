import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';


interface Variables {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  variables: String[] = ['Velocidad', 'Potencia', 'Aceleracion', 'Desviacion', 'Intensidad Solar', 'Direccion del Viento', 'Intensidad del Viento', 'Tiempo']
  tabs = ['Velocidad - Potencia', 'Aceleracion - Desviacion', 'Intensidad Solar - Tiempo'];
  selected = new FormControl(0);
  cx: String = ""
  cy: String = ""
  constructor() { }

  ngOnInit(): void {
  }
  addTab(cx:String, cy:String){
    if(cx !== "" && cy !=="" && cx!==cy){
    this.tabs.push(cx + ' - ' + cy);
    this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}
