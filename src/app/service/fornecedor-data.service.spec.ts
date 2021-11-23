import { TestBed } from '@angular/core/testing';

import { FornecedorDataService } from './fornecedor-data.service';

describe('FornecedorDataService', () => {
  let service: FornecedorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornecedorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
