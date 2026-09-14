import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValorPositivo } from './valor-positivo';

describe('ValorPositivo', () => {
  let component: ValorPositivo;
  let fixture: ComponentFixture<ValorPositivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorPositivo],
    }).compileComponents();

    fixture = TestBed.createComponent(ValorPositivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
