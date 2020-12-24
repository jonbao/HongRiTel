import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOperateComponent } from './customer-operate.component';

describe('CustomerOperateComponent', () => {
  let component: CustomerOperateComponent;
  let fixture: ComponentFixture<CustomerOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOperateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
