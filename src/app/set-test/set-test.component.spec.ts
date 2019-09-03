import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTestComponent } from './set-test.component';

describe('SetTestComponent', () => {
  let component: SetTestComponent;
  let fixture: ComponentFixture<SetTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
