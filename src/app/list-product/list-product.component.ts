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

  listProdotti: Array<Prodotto> = [];
  carrello: Array<Prodotto> = [];
  prodotto: Prodotto = new Prodotto();
  listaStorico: Array<Prodotto> = [];
  listOfferta: Array<Prodotto> = [];
  title: string = 'Conferma aggiunta';
  message: string = 'Vuoi aggiungere il prodotto al carrello?';
  confirmText = 'OK';
  cancelText = 'Annulla';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
  categoria: string;


  constructor(private prodottiService: ListProductService,
              private location: Location) {
  }

  ngOnInit() {
    this.getall();

  }

  orderBy(categoria) {
    if (categoria!="TUTTO") {
      this.prodottiService.findByCategoria(categoria).subscribe(data => {
        console.log(data);
        this.listProdotti = data;
      }, err => {
        console.error(err);
      })
    } else {
      this.getall();
    }
  }


  getall() {
    this.prodottiService.getall().subscribe(data => {
      this.listProdotti = data;
      console.log('getall');
      this.offerteDelGiorno();
    });
  }

  selectProdotto(prodotto: Prodotto) {
    this.prodotto = prodotto;
  }

  listaDisponibiliCategoria(categoria, disponibili) {
    this.prodottiService.categoriaDisponibili(categoria, disponibili).subscribe(data => {
      this.listProdotti = data;
    });
  }

  aggiungi(prodotto: Prodotto) {
    if (this.confirmClicked===true) {
      console.log(prodotto.quantitaDaAcquistare);
      this.prodottiService.modificaProdotto(prodotto);
      console.log(prodotto);
      this.carrello.push(prodotto);
      localStorage.setItem('carrello', JSON.stringify(this.carrello));
      console.log('carrello: ' + localStorage.getItem('carrello').toString());
      this.showAlert();
    } else {}
  }

  offerteDelGiorno() {
    for (var _i = 0; _i < 5; _i++) {
      let casuale: number = Math.round((Math.random() * this.listProdotti.length));
      if (this.listProdotti[casuale].offerta == 1) {
        _i--;
      } else {
        let sconto = this.listProdotti[casuale].prezzoUnitario - (this.listProdotti[casuale].prezzoUnitario * 0.2);
        let decimal: number = Number(parseFloat(sconto.toString()).toFixed(2));
        this.listProdotti[casuale].prezzoUnitario = decimal;
        this.listOfferta.push(this.listProdotti[casuale]);
        this.listProdotti[casuale].offerta = 1;
        console.log(this.listProdotti[casuale].prezzoUnitario);
      }
    }

  }
  showAlert() {
    alert("Prodotto aggiunto con successo!");
  }
}
