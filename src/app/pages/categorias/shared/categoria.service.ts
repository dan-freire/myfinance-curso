import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiPath = 'api/categorias';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]> {

    return this.http.get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategorias)
      );
  }

  getById(id: number): Observable<Categoria> {
  
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategoria)
      );
  }

  create(categoria: Categoria): Observable<Categoria> {

    return this.http.post(this.apiPath, categoria)
      .pipe(catchError(
        this.handleError),
        map(this.jsonDataToCategoria)
      );
  }

  update(categoria: Categoria): Observable<Categoria> {

    const url = `${this.apiPath}/${categoria.id}`;
    
    return this.http.put(url, categoria)
      .pipe(catchError(
        this.handleError),
        map(() => categoria)
      );
  }

  delete(id: number): Observable<any> {

    const url = `${this.apiPath}/${id}`;
    
    return this.http.delete(url)
      .pipe(catchError(
        this.handleError),
        map(() => null)
      );
  }

  private jsonDataToCategorias(jsonData: any[]): Categoria[] {
    
    const categorias: Categoria[] = [];

    jsonData.forEach(elemento => categorias.push(elemento as Categoria));

    return categorias;
  }

  private jsonDataToCategoria(jsonData: any): Categoria {
    
    return jsonData as Categoria;
  }

  private handleError(error: any): Observable<any> {
    
    console.log("Erro na requisição: ", error);

    return throwError(error);
  }
}
