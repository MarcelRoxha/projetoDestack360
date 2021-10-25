import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarContaSaidaComponent } from './cadastrar-conta-saida.component';

describe('CadastrarContaSaidaComponent', () => {
  let component: CadastrarContaSaidaComponent;
  let fixture: ComponentFixture<CadastrarContaSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarContaSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarContaSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
