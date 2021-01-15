
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDictionaryDetailComponent } from './systemdictionary-detail.component';

describe('SystemDictionaryDetailComponent', () => {
  let component: SystemDictionaryDetailComponent;
  let fixture: ComponentFixture<SystemDictionaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemDictionaryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictionaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


