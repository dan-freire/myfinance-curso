import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCategoriaComponent } from './form-categoria/form-categoria.component';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';

const routes: Routes = [
  { path: '', component: ListaCategoriaComponent },
  { path: 'novo', component: FormCategoriaComponent },
  { path: ':id/editar', component: FormCategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
