import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  pageTitle: string;
  categoriaForm: FormGroup;
  serverErrorMessages: string[];
  submittingForm: boolean = false;
  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoriaForm();
    this.loadCategoria();
  }
  
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'novo')
      this.criarCategoria();
    else
      this.editarCategoria();
  }

  private setCurrentAction() {

    if (this.route.snapshot.url[0].path == 'novo')
      this.currentAction = 'novo';
    else
      this.currentAction = 'editar';
  }

  private buildCategoriaForm() {

    this.categoriaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }
  
  private loadCategoria() {

    if (this.currentAction == 'editar') {

      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get('id')))
      )
      .subscribe(categoria => {
        this.categoria = categoria;
        this.categoriaForm.patchValue(categoria) // binds loaded categoria
      },
      error => alert('Ocorreu um erro ao carregar categoria'))
    }
  }

  private setPageTitle() {

    if (this.currentAction == 'novo')
      this.pageTitle = 'Cadastro de nova Categoria';
    else {
      const nomeCategoria = this.categoria.nome || '';
      this.pageTitle = `Editando Categoria: ${nomeCategoria}`;
    }
  }

  private criarCategoria() {

    const categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.create(categoria)
      .subscribe(
        categoria => this.actionForSuccess(categoria),
        error => this.actionForError(error)
      )
  }

  private editarCategoria() {

    const categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.update(categoria)
      .subscribe(
        categoria => this.actionForSuccess(categoria),
        error => this.actionForError(error)
      )
  }

  private actionForSuccess(categoria: Categoria) {

    toastr.success('Solicitação processada com sucesso!');

    this.router.navigateByUrl('categorias', { skipLocationChange: true })
      .then( () => this.router.navigate(['categorias', categoria.id, 'editar']) );
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
