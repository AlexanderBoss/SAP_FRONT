import { createViewChild } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Seguimiento } from 'src/app/services/seguimiento.services';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css'],
  providers: [Seguimiento]
})
export class SeguimientoComponent implements OnInit {

  displayedColumns: string[] = ['c_nombre', 'c_documento', 'c_direccion', 'c_codigo'];
  public tabla!: MatTableDataSource<any>;


  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    public seguimiento: Seguimiento,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    let parameter = {
      c_codigo: ''
    }
    this.seguimiento.getSeguimiento(parameter).subscribe(
      result =>{
        try {
          if (result.estado) {
            console.log(result.data);
            this.tabla = new MatTableDataSource<any>(result.data);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;
          }else{
            console.log(result);
            
          }
        } catch (error) {
          console.log(error);
          
        }
      }, error =>{
        console.log(error.error);        
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

}
