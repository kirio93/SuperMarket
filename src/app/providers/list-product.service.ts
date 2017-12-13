import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND_URL} from '../utill';
import {hasCommentAfterPosition} from 'tslint';
import {Observable} from 'rxjs/Observable';
import {Prodotto} from '../model/prodotto';


const httpOptions ={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable()
export class ListProductService {

  constructor(private http : HttpClient) { }


  getall (): Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>(BACKEND_URL+'/prodotto/getlist', httpOptions);
  }

  /**Metodo di acquisto prodotti nel carello
   * verificare inseririlo nel service carello
   * @param prodotto
   * @param carta
   * @returns {Observable<Object>}
   */
  acquisti(prodotto,carta){
    return this.http.post(BACKEND_URL+'/acquista/'+carta, prodotto, httpOptions)
  }

  findProdottoById(prodottoId): Observable<Prodotto>{
    return this.http.get<Prodotto>(BACKEND_URL+'/findById/'+prodottoId, httpOptions);
  }

  getListDisponibili(): Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>(BACKEND_URL+'/getListDisponibili',httpOptions);
  }

  /**Ristituisce la lista dei prodotti di una categoria
   *
   * @param categoria
   * @returns {Observable<Prodotto[]>}
   */
  getCategoria(categoria):Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>(BACKEND_URL+'/getByCategoria/'+categoria,httpOptions);
  }

  /**Ristituisce la lista dei prodotti acquistati precedentemente
   *
   * @returns {Observable<Prodotto[]>}
   */
  findStorico(): Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>(BACKEND_URL+'/getStorico',httpOptions);
  }

  categoriaDisponibili(categoria,disponibili) :Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>(BACKEND_URL+'/getByCategoria/'+categoria+'/'+disponibili, httpOptions);
  }

  /**Cancellazione del prodotto identificato dall'id
   *
   * @param idProdotto
   * @returns {Observable<Object>}
   */
  deleteProdotto(idProdotto) {
    return this.http.delete(BACKEND_URL+'/delete/'+idProdotto,httpOptions);
  }

}
