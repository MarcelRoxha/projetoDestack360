import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEmpresasComponent } from './tela-empresas.component';

describe('TelaEmpresasComponent', () => {
  let component: TelaEmpresasComponent;
  let fixture: ComponentFixture<TelaEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
