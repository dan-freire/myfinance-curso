import { Component, Injector, OnInit } from '@angular/core';
import {  Validators } from '@angular/forms';

import { Entrada } from '../shared/entrada.model';
import { EntradaService } from '../shared/entrada.service';

import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-form-entrada',
  templateUrl: './form-entrada.component.html',
  styleUrls: ['./form-entrada.component.css']
})
export class FormEntradaComponent extends BaseResourceFormComponent<Entrada> implements OnInit {

  categorias: Array<Categoria>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected entradaService: EntradaService,
    protected categoriaService: CategoriaService,
    protected injector: Injector
  ) {
    super(injector, new Entrada(), entradaService, Entrada.fromJson);
  }
  
  ngOnInit() {
    this.loadCategorias();
    super.ngOnInit();
  }
  
  get tipoCategoriaOptions(): Array<any> {
    
    return Object.entries(Entrada.tipos)
      .map(([valor, texto]) => {
        return {
          text: texto,
          value: valor
        }
      })
  }

  protected buildResourceForm() {

    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: ['despesa', [Validators.required]],
      valor: [null, [Validators.required]],
      data: [null, [Validators.required]],
      pago: [true, [Validators.required]],
      categoriaId: [null, [Validators.required]]
    })
  }

  protected edicaoTituloPagina(): string {
    const nomeEntrada = this.resource.nome || '';
    return `Editando Lançamento: ${nomeEntrada}`;
  }

  protected criacaoTituloPagina(): string {
    return 'Cadastro de novo Lançamento';
  }

  private loadCategorias() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }
}
