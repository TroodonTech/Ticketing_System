import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPtoRequestComponent } from './edit-pto-request.component';

describe('EditPtoRequestComponent', () => {
  let component: EditPtoRequestComponent;
  let fixture: ComponentFixture<EditPtoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPtoRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPtoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
