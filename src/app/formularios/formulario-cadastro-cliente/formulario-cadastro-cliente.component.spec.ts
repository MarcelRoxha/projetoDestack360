import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCadastroClienteComponent } from './formulario-cadastro-cliente.component';

describe('FormularioCadastroClienteComponent', () => {
  let component: FormularioCadastroClienteComponent;
  let fixture: ComponentFixture<FormularioCadastroClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCadastroClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCadastroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
