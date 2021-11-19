import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Entrada } from '../shared/entrada.model';
import { EntradaService } from '../shared/entrada.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';

@Component({
  selector: 'app-form-entrada',
  templateUrl: './form-entrada.component.html',
  styleUrls: ['./form-entrada.component.css']
})
export class FormEntradaComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  pageTitle: string;
  entradaForm: FormGroup;
  serverErrorMessages: string[];
  submittingForm: boolean = false;
  entrada: Entrada = new Entrada();
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
    private entradaService: EntradaService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit() {
    this.setCurrentAction();
    this.buildEntradaForm();
    this.loadEntrada();
    this.loadCategorias();
  }
  
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'novo')
      this.criarEntrada();
    else
      this.editarEntrada();
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

  private setCurrentAction() {

    if (this.route.snapshot.url[0].path == 'novo')
      this.currentAction = 'novo';
    else
      this.currentAction = 'editar';
  }

  private buildEntradaForm() {

    this.entradaForm = this.formBuilder.group({
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
  
  private loadEntrada() {

    if (this.currentAction == 'editar') {

      this.route.paramMap.pipe(
        switchMap(params => this.entradaService.getById(+params.get('id')))
      )
      .subscribe(entrada => {
        this.entrada = entrada;
        this.entradaForm.patchValue(entrada) // binds loaded entrada
      },
      error => alert('Ocorreu um erro ao carregar entrada'))
    }
  }

  private loadCategorias() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }

  private setPageTitle() {

    if (this.currentAction == 'novo')
      this.pageTitle = 'Cadastro de novo Lançamento';
    else {
      const nomeEntrada = this.entrada.nome || '';
      this.pageTitle = `Editando Lançamento: ${nomeEntrada}`;
    }
  }

  private criarEntrada() {

    const entrada = Object.assign(new Entrada(), this.entradaForm.value);

    this.entradaService.create(entrada)
      .subscribe(
        entrada => this.actionForSuccess(entrada),
        error => this.actionForError(error)
      )
  }

  private editarEntrada() {

    const entrada = Object.assign(new Entrada(), this.entradaForm.value);

    this.entradaService.update(entrada)
      .subscribe(
        entrada => this.actionForSuccess(entrada),
        error => this.actionForError(error)
      )
  }

  private actionForSuccess(entrada: Entrada) {

    toastr.success('Solicitação processada com sucesso!');

    this.router.navigateByUrl('entradas', { skipLocationChange: true })
      .then( () => this.router.navigate(['entradas', entrada.id, 'editar']) );
  }

  private actionForError(error: any) {

    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
  }

}
