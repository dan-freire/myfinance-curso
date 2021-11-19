import { Component, OnInit } from '@angular/core';
import { Entrada } from '../shared/entrada.model';
import { EntradaService } from '../shared/entrada.service';

@Component({
  selector: 'app-lista-entrada',
  templateUrl: './lista-entrada.component.html',
  styleUrls: ['./lista-entrada.component.css']
})
export class ListaEntradaComponent implements OnInit {

  entradas: Entrada[] = [];

  constructor(private entradaService: EntradaService) { }

  ngOnInit() {
    this.entradaService.getAll()
      .subscribe(entradas => this.entradas = entradas.sort((a, b) => b.id - a.id),
        error => alert('Erro ao carregar a lista de entradas. ' + error))
  }

  excluirEntrada(entrada: Entrada) {

    const deveExcluir = confirm('Deseja realmente excluir essa entrada?');

    if (deveExcluir) {

      this.entradaService.delete(entrada.id)
        .subscribe(
          () => this.entradas = this.entradas.filter(elemento => elemento != entrada),
          () => alert('Erro ao tentar excluir!'));
    }
  }

}
