import { TestBed, inject } from '@angular/core/testing';

import { CartaCreditoService } from './carta-credito.service';

describe('CartaCreditoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartaCreditoService]
    });
  });

  it('should be created', inject([CartaCreditoService], (service: CartaCreditoService) => {
    expect(service).toBeTruthy();
  }));
});
