import { Component, OnInit } from '@angular/core';
import {ListProductService} from '../providers/list-product.service';
import {Acquisti} from '../model/acquisti';
import {Prodotto} from '../model/prodotto';

@Component({
  selector: 'app-storico',
  templateUrl: './storico.component.html',
  styleUrls: ['./storico.component.css']
})
export class StoricoComponent implements OnInit {

  listaStorico : Array<Acquisti> = [];

  prodotto : Prodotto = new Prodotto();

  constructor(private prodottiService: ListProductService) { }

  ngOnInit() {
    this.getStorico();
  }

  getStorico() {
    this.prodottiService.findStorico().subscribe( data => {
      this.listaStorico = data;
      console.log(this.listaStorico);
      console.log("prova");
      for (let a of this.listaStorico) {
        this.prodottiService.findProdottoById(a.idProdotto).subscribe( data => {
          this.prodotto = data;
          console.log("prodotto: "+this.prodotto);
        }, err => {
          console.log(err);
        });
      }
      localStorage.setItem('storico', JSON.stringify(this.listaStorico));
    }, err => {
      console.error(err);
    });
  }

}
