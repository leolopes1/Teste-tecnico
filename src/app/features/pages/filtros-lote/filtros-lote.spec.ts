import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltrosLote } from './filtros-lote';

describe('FiltrosLote', () => {
  let component: FiltrosLote;
  let fixture: ComponentFixture<FiltrosLote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosLote],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosLote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
