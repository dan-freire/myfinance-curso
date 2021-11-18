import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEntradaComponent } from './lista-entrada/lista-entrada.component';

const routes: Routes = [
  { path: '', component: ListaEntradaComponent },
  // { path: 'novo', component: FormCategoriaComponent },
  // { path: ':id/editar', component: FormCategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
