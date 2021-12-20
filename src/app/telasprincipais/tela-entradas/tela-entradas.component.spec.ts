import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEntradasComponent } from './tela-entradas.component';

describe('TelaEntradasComponent', () => {
  let component: TelaEntradasComponent;
  let fixture: ComponentFixture<TelaEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaEntradasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
