import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentoDialog } from './lancamento-dialog';

describe('LancamentoDialog', () => {
  let component: LancamentoDialog;
  let fixture: ComponentFixture<LancamentoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
