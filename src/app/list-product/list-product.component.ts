import {Component, Inject, OnInit} from '@angular/core';
import {Prodotto} from '../model/prodotto';
import {ListProductService} from '../providers/list-product.service';
import {Location} from '@angular/common';




@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  listProdotti: Array<Prodotto>= [];
  carrello: Array<Prodotto>=[];
  prodotto: Prodotto = new Prodotto();
  listaStorico:Array<Prodotto>= [];


  constructor(private prodottiService: ListProductService,
              private location: Location) {
  }

  ngOnInit() {
    this.getall();
  }


  getall() {
    this.prodottiService.getall().subscribe(data => {
      this.listProdotti = data;
      console.log("getall")
    });
  }

  selectProdotto(prodotto :Prodotto){
      this.prodotto=prodotto;
  }


  getListDisponibili (){
    this.prodottiService.getListDisponibili().subscribe(data=>{
      this.listProdotti=data;
    })
  }

  findStorico(){
    this.prodottiService.findStorico().subscribe(data=>{
      this.listaStorico=data;
    })
  }

  deleteProdotto(idProdotto){
    this.prodottiService.deleteProdotto(idProdotto);

  }

  listaDisponibiliCategoria(categoria, disponibili){
    this.prodottiService.categoriaDisponibili(categoria, disponibili).subscribe(data=>{
      this.listProdotti=data;
    })
  }

  aggiungi(prodotto: Prodotto) {
    console.log(prodotto);
    this.carrello.push(prodotto);
    localStorage.setItem("carrello", JSON.stringify(this.carrello));
    console.log("carrello: "+ localStorage.getItem("carrello").toString());
  }
}
