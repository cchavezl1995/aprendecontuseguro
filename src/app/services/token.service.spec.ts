import { TestBed } from '@angular/core/testing';

import { Token} from '../services/token';

describe('Token.InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Token = TestBed.get(Token);
    expect(service).toBeTruthy();
  });
});
