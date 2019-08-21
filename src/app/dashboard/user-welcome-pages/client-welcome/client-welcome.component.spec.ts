import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWelcomeComponent } from './client-welcome.component';

describe('ClientWelcomeComponent', () => {
  let component: ClientWelcomeComponent;
  let fixture: ComponentFixture<ClientWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
