
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDictionaryOperateComponent } from './systemdictionary-operate.component';

describe('SystemDictionaryOperateComponent', () => {
  let component: SystemDictionaryOperateComponent;
  let fixture: ComponentFixture<SystemDictionaryOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemDictionaryOperateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictionaryOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


