import {Categoria} from './categoria';
import {Unita} from './unita';

export class Prodotto {

  id: number;
  nome: string;
  marca: string;
  dataDiScadenza: string;
  categoria: Categoria;
  quantitaDisponibile: number;
  quantitaDaAcquistare: number;
  unita: Unita;
  prezzoUnitario: number;
  prezzoSenzaIva: number;
  prezzoIvato: number;
  img: string;
  offerta: number;
  imgOfferta :string;

}
