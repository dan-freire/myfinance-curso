import { NgModule } from '@angular/core';

import { ChartModule } from 'primeng/chart';

import { SharedModule } from 'src/app/shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';

@NgModule({
  declarations: [
    RelatoriosComponent
  ],
  imports: [
    SharedModule,
    RelatoriosRoutingModule,
    ChartModule
  ]
})
export class RelatoriosModule { }
