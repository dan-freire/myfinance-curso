import { Component, OnInit } from '@angular/core';
import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias,
        error => alert('Erro ao carregar a lista de categorias. ' + error))
  }

  excluirCategoria(categoria: Categoria) {

    const deveExcluir = confirm('Deseja realmente excluir essa categoria?');

    if (deveExcluir) {

      this.categoriaService.delete(categoria.id)
        .subscribe(
          () => this.categorias = this.categorias.filter(elemento => elemento != categoria),
          () => alert('Erro ao tentar excluir!'));
    }
  }

}
