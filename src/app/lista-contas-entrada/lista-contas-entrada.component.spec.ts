import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContasEntradaComponent } from './lista-contas-entrada.component';

describe('ListaContasEntradaComponent', () => {
  let component: ListaContasEntradaComponent;
  let fixture: ComponentFixture<ListaContasEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaContasEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaContasEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
