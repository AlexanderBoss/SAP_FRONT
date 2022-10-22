import { Component, OnInit } from '@angular/core';
import { SolicituServices } from 'src/app/services/solicitud.services';

interface Documento {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css'],
  providers: [SolicituServices]
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

  file: File | undefined;

  constructor(
    public solicituServices: SolicituServices,
  ) { }
  
  ngOnInit(): void {
  }

  registrarSolicitud(){
    /* MODELO EN LA QUE DEBES ENVIAR LOS DATOS  */
    let parameter = {
      n_id_solicitud_cliente: 0,
      c_nombre: 'c_nombre',
      n_id_tipo_doc: 1,
      c_documento: 'c_documento',
      c_direccion: 'c_direccion',
      c_codigo: 'EXP10202201'
    }

    this.solicituServices.registrarSolicitud(parameter).subscribe(
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
      }
    );

  }

  uploadfile(target: any, tipoFile: String) {
    /* tipoFile = "TituloPropiedad o Croquis" */
    console.log(target.files.item(0));

    this.file = target.files.item(0)
    let extension = this.file?.name;
    /* SUBIMOS EL ARCHIVO AL SERVIDOR */
    this.solicituServices.uploadfile(extension, tipoFile, this.file).subscribe(
      result => {
        console.log(result.c_nombre)
        if (result.estado) {
          console.log("ARCHIVO CARGADO CORRECTAMENTE");
          let dataFile = {
            c_nombre: result.c_nombre,
            c_ruta: result.c_ruta,
            c_checksum: result.c_checksum
          }
          /* GUARDAMOS LOS DATOS DEL ARCHIVO A LA BD */
          this.solicituServices.saveFile(dataFile).subscribe(
            result => {
              if (result.estado) {
                console.log("ARCHIVO GUARDADO CORRECTAMENTE");
                /*AQUÍ PUEDES HACER LO QUE QUIERAS xD */
                
              } else {
                
              }
            }, error => {
              alert(error.error);
              console.log(error);
            }
          );          
        } else {
          
        }
      }, error => {
        alert(error.error);
        console.log(error);
        
      }
    );
  
  }

}
