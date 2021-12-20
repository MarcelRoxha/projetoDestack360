import { TestBed } from '@angular/core/testing';

import { ContasCadastradasService } from './contas-cadastradas.service';

describe('ContasCadastradasService', () => {
  let service: ContasCadastradasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContasCadastradasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
