import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarSaidaComponent } from './lancar-saida.component';

describe('LancarSaidaComponent', () => {
  let component: LancarSaidaComponent;
  let fixture: ComponentFixture<LancarSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancarSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
