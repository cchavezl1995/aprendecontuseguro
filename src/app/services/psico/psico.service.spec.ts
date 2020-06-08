import { TestBed } from '@angular/core/testing';

import { PsicoService } from './psico.service';

describe('PsicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PsicoService = TestBed.get(PsicoService);
    expect(service).toBeTruthy();
  });
});
