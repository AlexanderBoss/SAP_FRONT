import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class Seguimiento{
    public url: String;

    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    getSeguimiento(parameter: any): Observable<any> {
        console.log(parameter)
        return this._http.post(this.url + 'solicutud/getSolicitudes', parameter);
    }
}