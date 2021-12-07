import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';

@NgModule({
  declarations: [
    RelatoriosComponent
  ],
  imports: [
    SharedModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
