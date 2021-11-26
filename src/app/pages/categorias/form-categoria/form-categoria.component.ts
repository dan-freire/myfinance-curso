import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent extends BaseResourceFormComponent<Categoria> {

  constructor(protected categoriaService: CategoriaService, protected injector: Injector) {
    super(injector, new Categoria(), categoriaService, Categoria.fromJson);
  }
  
  protected buildResourceForm(): void {

    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    });
  }

  protected criacaoTituloPagina(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected edicaoTituloPagina(): string {
    const nomeCategoria = this.resource.nome || '';

    return 'Editar Categoria: ' + nomeCategoria;
  }
}
