import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/interface/cliente.interface';
import { homeServices } from 'src/app/services/home.services';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css'],
  providers: [homeServices]
})
export class VerClienteComponent implements OnInit {

  cliente!: Cliente;

  constructor(
    public dialogRef: MatDialogRef<VerClienteComponent>,    
    public homeServices: homeServices,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {    
    this.cliente = this.data.cliente;
    console.log(this.cliente);
  }

  guardar(e: any){

  }

}
