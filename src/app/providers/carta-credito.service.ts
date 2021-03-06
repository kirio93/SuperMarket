import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CartaCredito} from '../model/cartaCredito';
import {BACKEND_URL} from '../utill';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable()
export class CartaCreditoService {

  constructor(private http : HttpClient) { }

  saveOrUpdateCard(cartaCredito) : Observable<CartaCredito> {
    console.log(cartaCredito);
    return this.http.post<CartaCredito>(BACKEND_URL+'/cartaCredito/saveupdate', cartaCredito, httpOptions);
  }

  getAllCard() : Observable<CartaCredito[]> {
    return this.http.get<CartaCredito[]>(BACKEND_URL+'/cartaCredito/getall',httpOptions);
  }

  deleteCard (idCarta) : Observable<CartaCredito>{
    return this.http.delete<CartaCredito>(BACKEND_URL+'/cartaCredito/deletecard/'+idCarta,httpOptions);
  }

}
