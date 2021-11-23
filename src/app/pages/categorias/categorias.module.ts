import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { FormCategoriaComponent } from './form-categoria/form-categoria.component';

@NgModule({
  declarations: [ListaCategoriaComponent, FormCategoriaComponent],
  imports: [
    SharedModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
