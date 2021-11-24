import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Entrada } from './entrada.model';

@Injectable({
  providedIn: 'root'
})
export class EntradaService extends BaseResourceService<Entrada> {

  constructor(protected injector: Injector, private categoriaService: CategoriaService) {
    super('api/entradas', injector, Entrada.fromJson);
  }

  create(entrada: Entrada): Observable<Entrada> {
    
    return this.setCategoriaAndEnviarEntrada(entrada, super.create.bind(this));
  }

  update(entrada: Entrada): Observable<Entrada> {

    return this.setCategoriaAndEnviarEntrada(entrada, super.update.bind(this));
  }

  private setCategoriaAndEnviarEntrada(entrada: Entrada, enviarFn: Function): Observable<Entrada> {
    
    return this.categoriaService.getById(entrada.categoriaId)
      .pipe(
        flatMap(categoria => {
          entrada.categoria = categoria;
          return enviarFn(entrada);
        }),
        catchError(this.handleError)
      );
  }
}
