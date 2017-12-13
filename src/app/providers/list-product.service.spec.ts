import { TestBed, inject } from '@angular/core/testing';

import { ListProductService } from './list-product.service';

describe('ListProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListProductService]
    });
  });

  it('should be created', inject([ListProductService], (service: ListProductService) => {
    expect(service).toBeTruthy();
  }));
});
