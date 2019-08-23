import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUPComponent } from './set-u-p.component';

describe('SetUPComponent', () => {
  let component: SetUPComponent;
  let fixture: ComponentFixture<SetUPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
