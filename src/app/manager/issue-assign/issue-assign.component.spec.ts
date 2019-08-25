import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueAssignComponent } from './issue-assign.component';

describe('IssueAssignComponent', () => {
  let component: IssueAssignComponent;
  let fixture: ComponentFixture<IssueAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
