import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserManagerComponent } from './edit-user-manager.component';

describe('EditUserManagerComponent', () => {
  let component: EditUserManagerComponent;
  let fixture: ComponentFixture<EditUserManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
