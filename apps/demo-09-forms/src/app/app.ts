import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, FormControl,
         FormArray, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// ① Typed form interface — TypeScript catches mismatches at compile time
interface OrderForm {
  symbol:   FormControl<string>;
  side:     FormControl<'buy'|'sell'>;
  quantity: FormControl<number>;
  legs:     FormArray<FormGroup<{ symbol: FormControl<string>; qty: FormControl<number> }>>;
}

// ② Custom validator — a plain function, returns null (valid) or errors object
function lotSizeValidator(ctrl: AbstractControl): ValidationErrors | null {
  const qty = ctrl.value as number;
  return qty > 0 && qty % 10 === 0 ? null : { lotSize: { required: 10, got: qty } };
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 09: Reactive Forms</span></nav>
    <div style="padding:1.5rem;max-width:600px;margin:0 auto">
      <form [formGroup]="form" (ngSubmit)="submit()" style="display:flex;flex-direction:column;gap:0.75rem">

        <div class="card">
          <h2>Order Details</h2>
          <div>
            <label>Symbol</label>
            <input formControlName="symbol" placeholder="e.g. AAPL" style="display:block;width:100%;margin-top:0.2rem" />
            @if (f.symbol.errors?.['required'] && f.symbol.touched) { <small class="error">Required</small> }
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:0.75rem">
            <div>
              <label>Side</label>
              <select formControlName="side" style="display:block;width:100%;margin-top:0.2rem">
                <option value="buy">Buy</option><option value="sell">Sell</option>
              </select>
            </div>
            <div>
              <label>Quantity <span style="color:#aaa;font-weight:400">(must be multiple of 10)</span></label>
              <input type="number" formControlName="quantity" style="display:block;width:100%;margin-top:0.2rem" />
              @if (f.quantity.errors?.['lotSize'] && f.quantity.touched) {
                <small class="error">Must be a multiple of 10 (got {{ f.quantity.value }})</small>
              }
            </div>
          </div>
        </div>

        <!-- ③ FormArray: dynamic list of order legs -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem">
            <h2 style="margin:0">Order Legs (FormArray)</h2>
            <button type="button" class="btn-secondary" style="font-size:0.8rem" (click)="addLeg()">+ Add leg</button>
          </div>
          @if (legs.length === 0) { <p style="color:#aaa;font-size:0.9rem">No legs added. Click "+ Add leg" above.</p> }
          <div formArrayName="legs">
            @for (lg of legs.controls; track $index) {
              <div [formGroupName]="$index"
                   style="display:grid;grid-template-columns:1fr 1fr auto;gap:0.5rem;margin-bottom:0.5rem;align-items:end">
                <div><label>Symbol</label><input formControlName="symbol" placeholder="Symbol" style="width:100%;margin-top:0.2rem" /></div>
                <div><label>Qty</label><input type="number" formControlName="qty" placeholder="Qty" style="width:100%;margin-top:0.2rem" /></div>
                <button type="button" class="btn-secondary" style="color:#721c24" (click)="removeLeg($index)">✕</button>
              </div>
            }
          </div>
        </div>

        <button type="submit" class="btn-primary" [disabled]="form.invalid">Submit Order</button>
      </form>

      @if (submitted) {
        <div class="card" style="margin-top:1rem;border-left:4px solid #155724">
          <h2>Order submitted</h2>
          <pre style="font-size:0.8rem;margin:0">{{ submitted | json }}</pre>
        </div>
      }
    </div>
  `,
})
export class App {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group<OrderForm>({
    symbol:   this.fb.control('', Validators.required),
    side:     this.fb.control<'buy'|'sell'>('buy'),
    quantity: this.fb.control(100, [Validators.required, lotSizeValidator]),
    legs:     this.fb.array<FormGroup>([]),
  });

  get f()    { return this.form.controls; }
  get legs() { return this.form.controls.legs; }

  addLeg() {
    this.legs.push(this.fb.group({
      symbol: this.fb.control(this.f.symbol.value, Validators.required),
      qty:    this.fb.control(this.f.quantity.value,  [Validators.required, Validators.min(1)]),
    }));
  }

  removeLeg(i: number) { this.legs.removeAt(i); }

  submitted: ReturnType<typeof this.form.getRawValue> | null = null;
  submit() {
    if (this.form.valid) this.submitted = this.form.getRawValue();
  }
}
