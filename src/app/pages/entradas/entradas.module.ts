import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListaEntradaComponent } from './lista-entrada/lista-entrada.component';
import { FormEntradaComponent } from './form-entrada/form-entrada.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [ListaEntradaComponent, FormEntradaComponent],
  imports: [
    SharedModule,
    EntradasRoutingModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntradasModule { }
