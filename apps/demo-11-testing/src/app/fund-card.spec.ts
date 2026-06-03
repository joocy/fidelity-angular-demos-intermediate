import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FundCard, Fund } from './fund-card';

/**
 * Component integration test — tests behaviour through the rendered DOM.
 * Principle: test what the USER sees, not what the developer wrote.
 */
describe('FundCard', () => {
  let fixture:   ComponentFixture<FundCard>;
  let component: FundCard;

  const mockFund: Fund = {
    id: '1', name: 'Apex UK Equity Fund', ytdReturn: 8.4, riskRating: 'Medium'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundCard],   // standalone component: imported directly
    }).compileComponents();

    fixture   = TestBed.createComponent(FundCard);
    component = fixture.componentInstance;
    component.fund = mockFund;
    fixture.detectChanges();  // trigger initial render
  });

  it('should display the fund name', () => {
    const el = fixture.nativeElement.querySelector('[data-testid="fund-name"]');
    expect(el.textContent).toContain('Apex UK Equity Fund');
  });

  it('should show green colour for a positive return', () => {
    const el = fixture.nativeElement.querySelector('[data-testid="fund-return"]') as HTMLElement;
    expect(el.style.color).toBe('rgb(21, 87, 36)');  // #155724 in RGB
  });

  it('should show red colour for a negative return', () => {
    component.fund = { ...mockFund, ytdReturn: -2.1 };
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[data-testid="fund-return"]') as HTMLElement;
    expect(el.style.color).toBe('rgb(114, 28, 36)');  // #721c24 in RGB
  });

  it('should emit selected when clicked', () => {
    let emitted: Fund | undefined;
    component.selected.subscribe(f => emitted = f);

    fixture.nativeElement.querySelector('[data-testid="fund-card"]').click();
    expect(emitted).toEqual(mockFund);
  });
});
