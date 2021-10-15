import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarEntradaComponent } from './lancar-entrada.component';

describe('LancarEntradaComponent', () => {
  let component: LancarEntradaComponent;
  let fixture: ComponentFixture<LancarEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancarEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
