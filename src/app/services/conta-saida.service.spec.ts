import { TestBed } from '@angular/core/testing';

import { ContaSaidaService } from './conta-saida.service';

describe('ContaSaidaService', () => {
  let service: ContaSaidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaSaidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
