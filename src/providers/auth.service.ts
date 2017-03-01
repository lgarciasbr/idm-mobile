import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Config } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    private _url = "https://lgidm.herokuapp.com/auth/";
    token;

    constructor(
        private app: App,
        private _http: Http,
        private storage: Storage,
        private config: Config){
    }

    GetHeader(){
        return new Headers({
            'Content-Type': 'application/json',
            'ver': '1'
        })
    }

    Login(email, password){
        var header = this.GetHeader();

        var body  = JSON.stringify({'email': email, 'password': password});

        var options = new RequestOptions({
            headers: header
        });

        return this._http.post(this._url, body, options)
            .map(
                res => res.json()
            )
    }

    Logout(){
        var header = this.GetHeader();

        this.token = this.config.get('idM-token');
        header.append('token', this.token);

        var options = new RequestOptions({
            headers: header
        });

        this.config.set('idM-token', null);
        this.storage.remove('idM-token');

        this._http.delete(this._url, options)
            .map(res => res.json()
            );
    }

}
