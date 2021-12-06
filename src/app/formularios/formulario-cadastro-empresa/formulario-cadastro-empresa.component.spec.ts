import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCadastroEmpresaComponent } from './formulario-cadastro-empresa.component';

describe('FormularioCadastroEmpresaComponent', () => {
  let component: FormularioCadastroEmpresaComponent;
  let fixture: ComponentFixture<FormularioCadastroEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCadastroEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCadastroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
