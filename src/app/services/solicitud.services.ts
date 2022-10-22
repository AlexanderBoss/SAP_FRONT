import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class SolicituServices{
    public url: String;

    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    registrarSolicitud(parameter: any): Observable<any> {
        console.log(parameter)
        return this._http.post(this.url + 'solicutud/registrarSolicitud', parameter);
    }

    uploadfile(extension: any, carpeta: String, fileToUpload: any): Observable<any> {
        console.log(extension, carpeta);
        
        const formData: FormData = new FormData();
        formData.append('DA', fileToUpload, fileToUpload.name);
        return this._http.post(this.url+'solicutud/uploadfile?extension='+extension+'&carpeta='+carpeta,formData);
        
    }

    saveFile(parameter: any): Observable<any> {
        console.log(parameter)
        return this._http.post(this.url + 'solicutud/saveFile', parameter);
    }
}