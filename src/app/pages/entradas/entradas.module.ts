import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListaEntradaComponent } from './lista-entrada/lista-entrada.component';
import { FormEntradaComponent } from './form-entrada/form-entrada.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [ListaEntradaComponent, FormEntradaComponent],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntradasModule { }
