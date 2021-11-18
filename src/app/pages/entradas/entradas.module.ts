import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListaEntradaComponent } from './lista-entrada/lista-entrada.component';

@NgModule({
  declarations: [ListaEntradaComponent],
  imports: [
    CommonModule,
    EntradasRoutingModule
  ]
})
export class EntradasModule { }
