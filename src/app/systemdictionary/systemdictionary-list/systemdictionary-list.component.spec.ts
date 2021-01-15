
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDictionaryListComponent } from './systemdictionary-list.component';

describe('SystemDictionaryListComponent', () => {
  let component: SystemDictionaryListComponent;
  let fixture: ComponentFixture<SystemDictionaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemDictionaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictionaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


