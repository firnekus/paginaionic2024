import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { misDatosGuard } from './mis-datos.guard';

describe('misDatosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => misDatosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
