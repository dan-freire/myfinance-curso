import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const CATEGORIAS = 'categorias';

const routes: Routes = [
  { path: CATEGORIAS, loadChildren: './pages/categorias/categorias.module#CategoriasModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
