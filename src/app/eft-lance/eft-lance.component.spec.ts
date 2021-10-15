import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EftLanceComponent } from './eft-lance.component';

describe('EftLanceComponent', () => {
  let component: EftLanceComponent;
  let fixture: ComponentFixture<EftLanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EftLanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EftLanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
