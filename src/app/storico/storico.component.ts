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

  listaProdotti : Array<Prodotto> = [];

  prodotto : Prodotto = new Prodotto();

  constructor(private prodottiService: ListProductService) { }

  ngOnInit() {
    this.getStorico();
  }

  getStorico() {
    this.prodottiService.findStorico().subscribe( data => {
      this.listaStorico = data;
      console.log(this.listaStorico);
      for (let a of this.listaStorico) {
        this.prodottiService.findProdottoById(a.idProdotto).subscribe( data => {
          console.log(data);
          this.prodotto = data;
          this.listaProdotti.push(this.prodotto);
          console.log("prodotto: "+this.prodotto);
        }, err => {
          console.log(err);
        });
      }
      let n =this.listaStorico.length;
      for(let i=0; i<n; i++) {
        for(let j=1; j < (n-i); j++) {
          if (this.listaStorico[j-1].idFattura == this.listaStorico[j].idFattura) {
            this.listaStorico.splice(j, 1);
          }
        }
      }
    }, err => {
      console.error(err);
    });
  }

}
