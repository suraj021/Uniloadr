import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { AppError } from '../errors/app-error';

@Injectable()
export class FetcherService {

  constructor( private _http: Http) { }

  get( url ){
    return this._http.get( url )
              .map( res=> res.json() )
              .catch( this.handleError );

  }

  handleError( error: Response ){
    return Observable.throw( new AppError(error) );
  }
}
