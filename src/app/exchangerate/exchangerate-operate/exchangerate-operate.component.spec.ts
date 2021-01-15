
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateOperateComponent } from './exchangerate-operate.component';

describe('ExchangeRateOperateComponent', () => {
  let component: ExchangeRateOperateComponent;
  let fixture: ComponentFixture<ExchangeRateOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeRateOperateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRateOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


