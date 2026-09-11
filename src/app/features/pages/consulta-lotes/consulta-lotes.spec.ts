import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaLotes } from './consulta-lotes';

describe('ConsultaLotes', () => {
  let component: ConsultaLotes;
  let fixture: ComponentFixture<ConsultaLotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaLotes],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaLotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
