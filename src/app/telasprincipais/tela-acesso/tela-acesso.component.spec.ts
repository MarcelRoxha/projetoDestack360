import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAcessoComponent } from './tela-acesso.component';

describe('TelaAcessoComponent', () => {
  let component: TelaAcessoComponent;
  let fixture: ComponentFixture<TelaAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaAcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
