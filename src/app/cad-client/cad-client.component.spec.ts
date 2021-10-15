import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadClientComponent } from './cad-client.component';

describe('CadClientComponent', () => {
  let component: CadClientComponent;
  let fixture: ComponentFixture<CadClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
