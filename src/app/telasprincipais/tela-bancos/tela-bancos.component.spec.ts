import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaBancosComponent } from './tela-bancos.component';

describe('TelaBancosComponent', () => {
  let component: TelaBancosComponent;
  let fixture: ComponentFixture<TelaBancosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaBancosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
