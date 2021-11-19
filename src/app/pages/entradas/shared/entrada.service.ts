import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Entrada } from './entrada.model';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private apiPath = 'api/entradas';

  constructor(
    private http: HttpClient,
    private categoriaService: CategoriaService
  ) { }

  getAll(): Observable<Entrada[]> {

    return this.http.get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntradas)
      );
  }

  getById(id: number): Observable<Entrada> {
  
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntrada)
      );
  }

  create(entrada: Entrada): Observable<Entrada> {
    
    return this.categoriaService.getById(entrada.categoriaId)
      .pipe( flatMap(categoria => {

        entrada.categoria = categoria;

        return this.http.post(this.apiPath, entrada)
          .pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntrada)
          )
      }) );
  }

  update(entrada: Entrada): Observable<Entrada> {

    const url = `${this.apiPath}/${entrada.id}`;
    
    return this.categoriaService.getById(entrada.categoriaId)
      .pipe( flatMap(categoria => {

        entrada.categoria = categoria;

        return this.http.put(url, entrada)
          .pipe(
            catchError(this.handleError),
            map(() => entrada)
          );
      }) );
  }

  delete(id: number): Observable<any> {

    const url = `${this.apiPath}/${id}`;
    
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError),
        map(() => null)
      );
  }

  private jsonDataToEntradas(jsonData: any[]): Entrada[] {
    
    const entradas: Entrada[] = [];

    jsonData.forEach(elemento => entradas.push( Object.assign(new Entrada(), elemento) ));

    return entradas;
  }

  private jsonDataToEntrada(jsonData: any): Entrada {
    
    return Object.assign(new Entrada(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    
    console.log("Erro na requisição: ", error);

    return throwError(error);
  }
}
