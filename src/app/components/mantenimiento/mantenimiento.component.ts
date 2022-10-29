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


  cuadro_nombre:String="";
  cuadro_documento:String="";
  cuadro_direccion:String="";

  idDocumento: Number = 0;
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
  
  selectTipoDoc(value: any){    
    this.idDocumento = parseInt(value);
  }

  registrarSolicitud(){
    /* MODELO EN LA QUE DEBES ENVIAR LOS DATOS  */
    const fecha = new Date();
    console.log(fecha.getFullYear());
    console.log(fecha.getMonth() + 1);
    console.log(fecha.getDate());

    let codigoExp = "EXP-"+fecha.getFullYear()+(fecha.getMonth() + 1) + fecha.getDate()+"-"+ this.cuadro_documento;
    console.log(codigoExp);
    
    let parameter = {
      n_id_solicitud_cliente: 0,
      c_nombre: this.cuadro_nombre,
      n_id_tipo_doc: this.idDocumento,
      c_documento: this.cuadro_documento,
      c_direccion: this.cuadro_direccion,
      c_codigo: codigoExp

    }

    this.solicituServices.registrarSolicitud(parameter).subscribe(
      result =>{
        try {
          if (result.estado) {
            console.log(result.data);
            alert("Registro Correcto!")
            this.cuadro_nombre = "";
            this.idDocumento = 0;
            this.cuadro_documento = "";
            this.cuadro_direccion = "";
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
