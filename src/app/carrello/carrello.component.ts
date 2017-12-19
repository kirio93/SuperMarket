import {Component, OnInit} from '@angular/core';
import {ListProductService} from '../providers/list-product.service';
import {Location} from '@angular/common';

import {LoginService} from '../providers/login.service';
import {CartaCredito} from '../model/cartaCredito';
import {Prodotto} from '../model/prodotto';

import {CartaCreditoService} from '../providers/carta-credito.service';


@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {

  prodotto : Prodotto = new Prodotto;
  listaCarrello: Array<Prodotto> = [];
  carte: CartaCredito[] = [];
  indexCarta: number=0;
  totale: number = 0;
  newcarta: CartaCredito= new CartaCredito;

  constructor(private prodottiService: ListProductService, private utente: LoginService,
              private location: Location, private cartaService : CartaCreditoService) {
  }

  ngOnInit() {
    this.getCarrello();
    this.listaCarte();
  }

  getCarrello() {
    this.listaCarrello = JSON.parse(localStorage.getItem("carrello"));
    this.calcolaTotale();
  }

  calcolaTotale() {
    this.totale = 0;
    for (let p of this.listaCarrello) {
      this.totale = this.totale += (p.prezzoUnitario * p.quantitaDaAcquistare);
    }
    console.log("totale: "+this.totale);
  }

  aggiungiCarello(prodotto) {
    this.listaCarrello.push(prodotto);
    localStorage.setItem("carrello", JSON.stringify(this.listaCarrello));
    this.calcolaTotale();
  }

  eliminaCarello(prodotto) {
    const i = this.listaCarrello.indexOf(prodotto);
    this.listaCarrello.splice(i, 1);
    console.log('i '+i);
    localStorage.setItem("carrello", JSON.stringify(this.listaCarrello));
    console.log('prodotto eliminato');
    this.calcolaTotale();
  }

  modificaProdotto(prodotto) {
    const i = this.listaCarrello.indexOf(prodotto);
    this.listaCarrello.splice(1, i, prodotto);
    console.log(' prodotto modificato ');
    this.calcolaTotale();
  }

  svuotaCarrello() {
    this.listaCarrello = [];
    localStorage.setItem("carrello", JSON.stringify(this.listaCarrello));
    this.calcolaTotale();
  }

  acquistaProdotti(idCarta) {
    this.prodottiService.acquisti(this.listaCarrello, idCarta);
    this.svuotaCarrello();
  }


  /**Carte Credito
   *
   */
  listaCarte() {
    this.cartaService.getAllCard().subscribe(data => {
      this.carte = data;
    });
    this.indexCarta=this.carte.length;
  }

  eliminaCarta(idCarta) {
    this.cartaService.deleteCard(idCarta);
  }

  saveCarta(carta){
    this.cartaService.saveOrUpdateCard(carta).subscribe( data => {
      console.log(data);
    }, err => {
      console.error(err);
    });
    console.log(carta);
    this.listaCarte();
  }




}
