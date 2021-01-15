
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOperateComponent } from './category-operate.component';

describe('CategoryOperateComponent', () => {
  let component: CategoryOperateComponent;
  let fixture: ComponentFixture<CategoryOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryOperateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


