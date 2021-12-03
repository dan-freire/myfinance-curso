import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Entrada } from '../shared/entrada.model';
import { EntradaService } from '../shared/entrada.service';

@Component({
  selector: 'app-lista-entrada',
  templateUrl: './lista-entrada.component.html',
  styleUrls: ['./lista-entrada.component.css']
})
export class ListaEntradaComponent extends BaseResourceListComponent<Entrada> {

  constructor(protected entradaService: EntradaService) {
    super(entradaService);
  }
}
