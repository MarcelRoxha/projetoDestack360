import { EmpresaModel } from './../../models/empresaModel';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-formulario-cadastro-empresa',
  templateUrl: './formulario-cadastro-empresa.component.html',
  styleUrls: ['./formulario-cadastro-empresa.component.css']
})

export class FormularioCadastroEmpresaComponent implements OnInit {
  formulario: FormGroup ;
 
  empresaModel: EmpresaModel
  
  constructor() { 
    this.empresaModel = new EmpresaModel();
  }

  ngOnInit(): void {

   this.formulario = new FormGroup({
    
    });
  }


  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
  submit(){

  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }


  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)?.valid &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    
    );
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo)?.hasError('required') &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

}
