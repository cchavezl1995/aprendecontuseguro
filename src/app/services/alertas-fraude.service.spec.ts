import { TestBed } from '@angular/core/testing';

import { AlertasFraudeService } from './alertas-fraude.service';

describe('AlertasFraudeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertasFraudeService = TestBed.get(AlertasFraudeService);
    expect(service).toBeTruthy();
  });
});
