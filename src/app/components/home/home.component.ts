import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { homeServices } from 'src/app/services/home.services';
import { VerClienteComponent } from '../ver-cliente/ver-cliente.component';

const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [homeServices]
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'ruc', 'denominacion', 'deuda', 'acciones'];
  public tabla!: MatTableDataSource<any>;


  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ruc = "20388021196";
  iddeuda = 0;

  tipodeuda = [
    {id: 1, name: 'Deudor'},
    {id: 2, name: 'No Deudor'}
  ]

  constructor(
    public homeServices: homeServices,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    let parameter = {
      iddeuda: this.iddeuda
    }
    this.homeServices.get(parameter).subscribe(
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

  show(e: any){
    console.log(e);    
    const dialogRef = this.dialog.open(VerClienteComponent, {
      width: '750px',
      data: { cliente: e}
    });
    dialogRef.afterClosed().subscribe(result => {
      /* try {        
        this.get();

      } catch (error) {
        console.log(error);
        this.get();
      } */
    });
  }

  select(e: number){
    this.iddeuda = e;
    this.get();    
  }

  getUser(){

    let parameter = {
      ruc: this.ruc
    }

    this.homeServices.getUser(parameter).subscribe(
      result =>{
        try {
          if (result.estado) {
            console.log(result.data);
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

}
