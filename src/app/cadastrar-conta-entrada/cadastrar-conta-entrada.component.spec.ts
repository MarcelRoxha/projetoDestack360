import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarContaEntradaComponent } from './cadastrar-conta-entrada.component';

describe('CadastrarContaEntradaComponent', () => {
  let component: CadastrarContaEntradaComponent;
  let fixture: ComponentFixture<CadastrarContaEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarContaEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarContaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
