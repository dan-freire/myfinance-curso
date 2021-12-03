import { AfterContentChecked, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  pageTitle: string;
  resourceForm: FormGroup;
  serverErrorMessages: string[];
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
      protected injector: Injector,
      protected resource: T,
      protected resourceService: BaseResourceService<T>,
      protected jsonDataToResourceFn: (jsonData) => T
    ) {
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
  }
  
  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }
  
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'novo')
      this.criarResource();
    else
      this.editarResource();
  }

  protected setCurrentAction() {

    if (this.route.snapshot.url[0].path == 'novo')
      this.currentAction = 'novo';
    else
      this.currentAction = 'editar';
  }
  
  protected loadResource() {

    if (this.currentAction == 'editar') {

      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')))
      )
      .subscribe(resource => {
        this.resource = resource;
        this.resourceForm.patchValue(resource) // binds loaded resource
      },
      error => alert('Ocorreu um erro ao carregar recurso'))
    }
  }

  protected setPageTitle() {

    if (this.currentAction == 'novo')
      this.pageTitle = this.criacaoTituloPagina();
    else {
      this.pageTitle = this.edicaoTituloPagina();
    }
  }

  protected criacaoTituloPagina(): string {
    return 'Novo';
  }

  protected edicaoTituloPagina(): string {
    return 'Edição';
  }

  protected criarResource() {

    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource)
      .subscribe(
        resource => this.actionForSuccess(resource),
        error => this.actionForError(error)
      );
  }

  protected editarResource() {

    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource)
      .subscribe(
        resource => this.actionForSuccess(resource),
        error => this.actionForError(error)
      );
  }

  protected actionForSuccess(resource: T) {

    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then( () => this.router.navigate([baseComponentPath, resource.id, 'editar']) );
  }

  protected actionForError(error: any) {

    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
  }

  protected abstract buildResourceForm(): void;
}
