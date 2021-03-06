import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Config } from 'ionic-angular';
import { AppConfig } from './config.service.ts';
import 'rxjs/add/operator/map';

@Injectable()
export class CRUDService {
    private endPoint;

    constructor(
        private _http: Http,
        private storage: Storage,
        private config: Config){

        this.endPoint = AppConfig.apiEndpoint;
    }

    GetHeader(){
        var header = new Headers({
            'Content-Type': 'application/json',
            'ver': '1',
            'token': this.config.get('idM-token')
        })

        var options = new RequestOptions({
            headers: header
        });

        return options;
    }

    GetList(type, page?){
        var options = this.GetHeader();

        return this._http.get(this.endPoint + '/' + type + '/?page=' + page + '&per_page=30', options)
            .map(res => res.json());
    }

    GetItem(item){
        var options = this.GetHeader();

        return this._http.get(item._url, options)
            .map(res => res.json());

    }


    SearchItem(type, value?, page?){
        var options = this.GetHeader();

        return this._http.get(this.endPoint + '/' + type + '/search/?email=' + value + '&page=' + page + '&per_page=12', options)
            .map(res => res.json());
    }


    AddItem(type, item){
        var options = this.GetHeader();

        return this._http.post(this.endPoint + '/' + type + '/', JSON.stringify(item), options)
            .map(res => res.json());
    }

    DeleteItem(item){
        var options = this.GetHeader();

        return this._http.delete(item._url, options)
            .map(res => res.json());
    }

    Logout(){
        var options = this.GetHeader();

        this.config.set('idM-token', null);
        this.storage.remove('idM-token');

        return this._http.delete(this.endPoint + '/auth/', options)
            .map(res => res.json());
    }

}
