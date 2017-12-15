import {Component, OnInit} from '@angular/core';
import {ListProductService} from '../providers/list-product.service';
import {Location} from '@angular/common';

import {LoginService} from '../providers/login.service';
import {CartaCredito} from '../model/cartaCredito';
import {Prodotto} from '../model/prodotto';


@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {

  listaCarrello : Prodotto[] =[];
  carte: CartaCredito[] = [];


  constructor(private prodottiService: ListProductService, private utente: LoginService,
              private location: Location) {
    this.getall();

  }

  ngOnInit() {

  }

  getall() {
    this.prodottiService.getall().subscribe(data => {
      this.listaCarrello = data;
      console.log(this.listaCarrello);
    });
  }

  aggiungiCarello(prodotto) {
    this.listaCarrello.push(prodotto);
  }

  eliminaCarello(prodotto) {
    const i = this.listaCarrello.indexOf(prodotto);
    this.listaCarrello.splice(1, i);
    console.log('prodotto eliminato');
  }

  modificaProdotto(prodotto) {
    const i = this.listaCarrello.indexOf(prodotto);
    this.listaCarrello.splice(1, i, prodotto);
    console.log(' prodotto modificato ');
  }

  svuotaCarrello() {
    this.listaCarrello = [];
  }

  acquistaProdotti(idCarta) {
    this.prodottiService.acquisti(this.listaCarrello, idCarta);
  }

  /**listaCarte(idUtente) {
    this.utente.carte(idUtente).subscribe( data=>{
      this.carte=data;
    });
}*/
}
