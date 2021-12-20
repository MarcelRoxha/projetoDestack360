import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaTransferenciasComponent } from './tela-transferencias.component';

describe('TelaTransferenciasComponent', () => {
  let component: TelaTransferenciasComponent;
  let fixture: ComponentFixture<TelaTransferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaTransferenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaTransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
