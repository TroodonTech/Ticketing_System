import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPtoRequestComponent } from './view-pto-request.component';

describe('ViewPtoRequestComponent', () => {
  let component: ViewPtoRequestComponent;
  let fixture: ComponentFixture<ViewPtoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPtoRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPtoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
