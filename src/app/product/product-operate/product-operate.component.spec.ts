
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOperateComponent } from './product-operate.component';

describe('ProductOperateComponent', () => {
  let component: ProductOperateComponent;
  let fixture: ComponentFixture<ProductOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOperateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


