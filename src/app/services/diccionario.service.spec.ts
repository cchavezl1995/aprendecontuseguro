import { TestBed } from '@angular/core/testing';

import { DiccionarioService } from './diccionario.service';

describe('DiccionarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiccionarioService = TestBed.get(DiccionarioService);
    expect(service).toBeTruthy();
  });
});
