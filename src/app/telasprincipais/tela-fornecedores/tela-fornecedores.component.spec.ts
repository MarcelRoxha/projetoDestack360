import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaFornecedoresComponent } from './tela-fornecedores.component';

describe('TelaFornecedoresComponent', () => {
  let component: TelaFornecedoresComponent;
  let fixture: ComponentFixture<TelaFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaFornecedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
