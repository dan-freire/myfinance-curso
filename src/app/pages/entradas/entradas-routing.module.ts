import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormEntradaComponent } from './form-entrada/form-entrada.component';
import { ListaEntradaComponent } from './lista-entrada/lista-entrada.component';

const routes: Routes = [
  { path: '', component: ListaEntradaComponent },
  { path: 'novo', component: FormEntradaComponent },
  { path: ':id/editar', component: FormEntradaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
