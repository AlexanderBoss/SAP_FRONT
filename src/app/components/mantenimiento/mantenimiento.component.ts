import { Component, OnInit } from '@angular/core';

interface Documento {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {



  // LISTA DESPLEGABLE
  documentos: Documento[] = [
    {value: '1', viewValue: 'DNI'},
    {value: '2', viewValue: 'DNIe'},
    {value: '3', viewValue: 'Carné de Extranjería'},
    {value: '4', viewValue: 'Pasaporte'},
    {value: '5', viewValue: 'Carné de identidad emitido por RREE'},
    {value: '6', viewValue: 'Carné Permiso Temporal de Permanencia'},
    {value: '7', viewValue: 'RUC'},

  ];



  constructor() { }
  
  ngOnInit(): void {
  }

}
