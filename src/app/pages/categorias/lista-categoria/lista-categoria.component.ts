import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent extends BaseResourceListComponent<Categoria> {

  constructor(protected categoriaService: CategoriaService) {
    super(categoriaService);
  }
}
