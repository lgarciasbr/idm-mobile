import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Config } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountsService {
    private _url = "https://lgidm.herokuapp.com/accounts/";
    token;

    constructor(
        private _http: Http,
        private config: Config){
    }

    GetHeader(){
        return new Headers({
            'Content-Type': 'application/json',
            'ver': '1'
        })
    }

    GetUsers(page?){
        var header = this.GetHeader();

        this.token = this.config.get('idM-token');
        header.append('token', this.token);

        var options = new RequestOptions({
            headers: header
        });

        return this._http.get(this._url + '?page=' + page + '&per_page=15', options)
            .map(res => res.json());
    }

    GetUser(account){
        var header = this.GetHeader();

        this.token = this.config.get('idM-token');
        header.append('token', this.token);

        var options = new RequestOptions({
            headers: header
        });

        return this._http.get(account._url, options)
            .map(res => res.json());

    }

    AddUser(account){
        var header = this.GetHeader();

        this.token = this.config.get('idM-token');
        header.append('token', this.token);

        var options = new RequestOptions({
            headers: header
        });

        return this._http.post(this._url, JSON.stringify(account), options)
            .map(res => res.json());
    }

    DeleteUser(account){
        var header = this.GetHeader();

        this.token = this.config.get('idM-token');
        header.append('token', this.token);

        var options = new RequestOptions({
            headers: header
        });

        return this._http.delete(account._url, options)
            .map(res => res.json());
    }

}
