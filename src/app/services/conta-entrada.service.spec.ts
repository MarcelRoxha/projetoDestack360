import { TestBed } from '@angular/core/testing';

import { ContaEntradaService } from './conta-entrada.service';

describe('ContaEntradaService', () => {
  let service: ContaEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
