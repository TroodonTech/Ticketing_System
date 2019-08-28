import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueActionEmpComponent } from './issue-action-emp.component';

describe('IssueActionEmpComponent', () => {
  let component: IssueActionEmpComponent;
  let fixture: ComponentFixture<IssueActionEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueActionEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueActionEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
