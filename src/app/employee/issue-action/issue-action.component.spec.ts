import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueActionComponent } from './issue-action.component';

describe('IssueActionComponent', () => {
  let component: IssueActionComponent;
  let fixture: ComponentFixture<IssueActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
