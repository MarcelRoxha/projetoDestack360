import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSaidasComponent } from './tela-saidas.component';

describe('TelaSaidasComponent', () => {
  let component: TelaSaidasComponent;
  let fixture: ComponentFixture<TelaSaidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaSaidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaSaidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
