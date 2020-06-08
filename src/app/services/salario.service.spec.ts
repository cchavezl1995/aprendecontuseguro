import { TestBed } from '@angular/core/testing';

import { SalarioService } from './salario.service';

describe('SalarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalarioService = TestBed.get(SalarioService);
    expect(service).toBeTruthy();
  });
});
