import { Component, OnInit } from '@angular/core';

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
  variables: String[] = ['Velocidad', 'Potencia', 'Aceleracion', 'Desviacion', 'Intensidad Solar', 'Direccion del Viento', 'Intensidad del Viento']
  tabs = ['Una', 'Dos', 'Tres'];
  constructor() { }

  ngOnInit(): void {
  }

}
