import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const CATEGORIAS = 'categorias';
const ENTRADAS = 'entradas';
const RELATORIOS = 'relatorios';

const routes: Routes = [
  { path: CATEGORIAS, loadChildren: `./pages/${CATEGORIAS}/${CATEGORIAS}.module#CategoriasModule` },
  { path: ENTRADAS, loadChildren: `./pages/${ENTRADAS}/${ENTRADAS}.module#EntradasModule` },
  { path: RELATORIOS, loadChildren: `./pages/${RELATORIOS}/${RELATORIOS}.module#RelatoriosModule` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
