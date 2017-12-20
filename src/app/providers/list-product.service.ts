import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND_URL} from '../utill';
import {hasCommentAfterPosition} from 'tslint';
import {Observable} from 'rxjs/Observable';
import {Prodotto} from '../model/prodotto';
import {CartaCredito} from '../model/cartaCredito';


const httpOptions ={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable()
export class ListProductService {


  carrello: Prodotto[] = [];

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
  acquisti(prodotto, idCarta) {
    console.log("carta: " + idCarta);
    console.log("prodotto: "+prodotto);
    return this.http.post(BACKEND_URL + '/prodotto/acquista/' + idCarta, prodotto, httpOptions);
  }

  findProdottoById(prodottoId): Observable<Prodotto> {
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

  /*******************************************/
  /**Metodi per il carrello
   *
   */
  leggiCarrello() {
    this.carrello = JSON.parse(localStorage.getItem('carrello'));
  }

  aggiungiCarello(prodotto) {
    this.carrello.push(prodotto);
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
  }

  eliminaCarello(prodotto) {
    const i = this.carrello.indexOf(prodotto);
    this.carrello.splice(1, i);
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
    console.log('prodotto eliminato');
  }

  modificaProdotto(prodotto) {
    return this.http.post(BACKEND_URL+"/saveOrUpdate", httpOptions);
  }

  svuotaCarrello() {
    this.carrello = [];
    localStorage.removeItem('carrello');
  }
}
