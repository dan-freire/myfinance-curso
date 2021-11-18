import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const CATEGORIAS = 'categorias';
const ENTRADAS = 'entradas';

const routes: Routes = [
  { path: CATEGORIAS, loadChildren: `./pages/${CATEGORIAS}/${CATEGORIAS}.module#CategoriasModule` },
  { path: ENTRADAS, loadChildren: `./pages/${ENTRADAS}/${ENTRADAS}.module#EntradasModule` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
