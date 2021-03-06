import { Injector, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(protected resourceService: BaseResourceService<T>) {}

  ngOnInit() {
    this.resourceService.getAll()
      .subscribe(resources => this.resources = resources.sort((a, b) => b.id - a.id),
        error => alert('Erro ao carregar a lista. ' + error))
  }

  excluirResource(resource: T) {

    const deveExcluir = confirm('Deseja realmente excluir este item?');

    if (deveExcluir) {

      this.resourceService.delete(resource.id)
        .subscribe(
          () => this.resources = this.resources.filter(elemento => elemento != resource),
          () => alert('Erro ao tentar excluir!'));
    }
  }
}
