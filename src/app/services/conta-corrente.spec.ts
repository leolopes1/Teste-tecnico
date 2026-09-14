import { TestBed } from '@angular/core/testing';
import { ContaCorrente } from './conta-corrente';

describe('ContaCorrente', () => {
  let service: ContaCorrente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaCorrente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
