import {Component, OnInit} from '@angular/core';
import {ListProductService} from '../providers/list-product.service';
import {Location} from '@angular/common';

import {LoginService} from '../providers/login.service';
import {CartaCredito} from '../model/cartaCredito';
import {Prodotto} from '../model/prodotto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {

  listaCarrello: Prodotto[] = [];
  carte: CartaCredito[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private prodottiService: ListProductService, private utente: LoginService, private _formBuilder: FormBuilder,
              private location: Location) {
    this.getall();

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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

  listaCarte() {
    this.prodottiService.getAllCard().subscribe(data => {
      this.carte = data;
    });
  }

  eliminaCarta(idCarta) {
    this.prodottiService.deleteCard(idCarta);
  }

  saveCarta(carta){
    this.prodottiService.saveOrUpdateCard(carta);
  }
}
