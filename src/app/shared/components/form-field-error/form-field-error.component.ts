import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMensagem}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;
  
  constructor() { }

  ngOnInit() {
  }

  public get errorMensagem(): string | null {

    if (this.mostrarMensagemError())
      return this.showMensagemError();
    else
      return null;
  }

  private mostrarMensagemError(): boolean {
  
    return (this.formControl.invalid && this.formControl.touched);
  }

  private showMensagemError(): string | null {

    if (this.formControl.errors.required)
      return 'Dado obrigatório';
    else if (this.formControl.errors.email)
      return 'Email inválido';
    else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Deve ser no mínimo ${requiredLength} caracteres`;
    }
    else if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `Deve ser no mínimo ${requiredLength} caracteres`;
    }
  }

}
